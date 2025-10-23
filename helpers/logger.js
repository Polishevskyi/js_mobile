class Logger {
  static info(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  static error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
  }

  static step(message) {
    console.log(`\n→ ${message}`);
  }

  static apiRequest(method, url, data = null) {
    const dataStr = data
      ? ` | Data: ${JSON.stringify(data).substring(0, 100)}`
      : '';
    this.step(`${method.toUpperCase()} ${url}${dataStr}`);
  }

  static apiResponse(status, data = null) {
    const dataStr = data ? ` | ${JSON.stringify(data).substring(0, 100)}` : '';
    this.step(`Response: ${status}${dataStr}`);
  }

  static mobileDeviceInfo(platform, version, device) {
    this.info(
      `Device info - Platform: ${platform}, Version: ${version}, Device: ${device}`
    );
  }
}

export default Logger;
