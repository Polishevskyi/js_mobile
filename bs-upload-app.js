#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import FormData from 'form-data';
import sodium from 'tweetsodium';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Function to read .env file
function loadEnvFile() {
  const envPath = path.join(dirname, '.env');

  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found!');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach((line) => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const [key, ...valueParts] = trimmedLine.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  return envVars;
}

// Function to update .env file
function updateEnvFile(newAppPath) {
  const envPath = path.join(dirname, '.env');
  const envContent = fs.readFileSync(envPath, 'utf8');

  // Replace MOBILE_APP_PATH with new value
  const updatedContent = envContent.replace(
    /MOBILE_APP_PATH=.*/,
    `MOBILE_APP_PATH=${newAppPath}`
  );

  fs.writeFileSync(envPath, updatedContent);
}

// Function to get GitHub public key for encryption
function getGitHubPublicKey(token, owner, repo) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${owner}/${repo}/actions/secrets/public-key`,
      method: 'GET',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Node.js',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve(response);
          } else {
            reject(new Error(`Failed to get public key: ${data}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// Function to encrypt secret value using GitHub's public key
function encryptSecret(secret, publicKey) {
  // GitHub uses tweetsodium for encryption
  const messageBytes = Buffer.from(secret);
  const keyBytes = Buffer.from(publicKey, 'base64');
  const encryptedBytes = sodium.seal(messageBytes, keyBytes);
  return Buffer.from(encryptedBytes).toString('base64');
}

// Function to update GitHub secret
async function updateGitHubSecret(token, owner, repo, secretName, secretValue) {
  try {
    // Get public key first
    const publicKeyData = await getGitHubPublicKey(token, owner, repo);
    const encryptedSecret = encryptSecret(secretValue, publicKeyData.key);

    const requestBody = JSON.stringify({
      encrypted_value: encryptedSecret,
      key_id: publicKeyData.key_id,
    });

    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: `/repos/${owner}/${repo}/actions/secrets/${secretName}`,
      method: 'PUT',
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Node.js',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode === 204) {
            resolve();
          } else {
            console.error(`❌ Failed to update GitHub secret: ${data}`);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(requestBody);
      req.end();
    });
  } catch (error) {
    throw error;
  }
}

// Function to upload file to BrowserStack
function uploadToBrowserStack(filePath, username, accessKey) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    const options = {
      hostname: 'api-cloud.browserstack.com',
      port: 443,
      path: '/app-automate/upload',
      method: 'POST',
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${Buffer.from(`${username}:${accessKey}`).toString('base64')}`,
      },
    };

    console.log('📤 Uploading APK file to BrowserStack...');

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            resolve(response.app_url);
          } else {
            console.error('❌ Upload error:', response);
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        } catch (error) {
          console.error('❌ Response parsing error:', error);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Network error:', error);
      reject(error);
    });

    form.pipe(req);
  });
}

// Main function
async function main() {
  try {
    console.log('🚀 Starting APK upload to BrowserStack...\n');

    // Load variables from .env file
    const envVars = loadEnvFile();

    const username = envVars.BROWSERSTACK_USERNAME;
    const accessKey = envVars.BROWSERSTACK_ACCESS_KEY;
    const githubToken = envVars.GITHUB_TOKEN;
    const githubOwner = envVars.GITHUB_OWNER;
    const githubRepo = envVars.GITHUB_REPO;
    const appPath = path.join(dirname, 'apps', 'app.apk');

    // Check for required variables
    if (!username || !accessKey) {
      console.error(
        '❌ BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY not found in .env file!'
      );
      process.exit(1);
    }

    // Check for APK file existence
    if (!fs.existsSync(appPath)) {
      console.error('❌ APK file not found in apps/ folder');
      process.exit(1);
    }

    console.log(`📁 APK file: ${appPath}\n`);

    // Upload file
    const appUrl = await uploadToBrowserStack(appPath, username, accessKey);

    // Update .env file
    updateEnvFile(appUrl);

    // Update GitHub secret if GitHub credentials are provided
    if (githubToken && githubOwner && githubRepo) {
      console.log('\n🔄 Updating GitHub secret...');
      try {
        await updateGitHubSecret(
          githubToken,
          githubOwner,
          githubRepo,
          'MOBILE_APP_PATH',
          appUrl
        );
      } catch (error) {
        console.error('❌ Failed to update GitHub secret:', error.message);
        console.log('⚠️  Continuing without updating GitHub secret...');
      }
    } else {
      console.log('\n⚠️  GitHub credentials not found in .env file');
      console.log(
        '📝 To enable automatic GitHub secret updates, add the following to your .env file:'
      );
      console.log('   GITHUB_TOKEN=your_github_token');
      console.log('   GITHUB_OWNER=your_github_username');
      console.log('   GITHUB_REPO=your_repository_name');
    }

    console.log('\n🎉 Process completed successfully!');

    if (!githubToken || !githubOwner || !githubRepo) {
      console.log(
        "\n🚨🚨🚨 IMPORTANT: Don't forget to update MOBILE_APP_PATH in GitHub Actions secrets! 🚨🚨🚨"
      );
    }
  } catch (error) {
    console.error('\n💥 Error:', error.message);
    process.exit(1);
  }
}

// Run script
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { uploadToBrowserStack, updateEnvFile, loadEnvFile, updateGitHubSecret };
