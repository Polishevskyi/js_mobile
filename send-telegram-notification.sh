#!/bin/bash

# Telegram Notification Script for Mobile Test Automation
# This script collects test results from Allure reports and sends notifications to Telegram
# Usage: ./send-telegram-notification.sh
# Required environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, GITHUB_REPOSITORY, GITHUB_SHA, etc.

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Get test results from Allure
if [ -d "allure-results" ]; then
    TOTAL_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -v "^$" | wc -l)
    PASSED_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -c "passed" || echo "0")
    FAILED_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -c "failed" || echo "0")
    BROKEN_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -c "broken" || echo "0")
    SKIPPED_TESTS=$(find allure-results -name "*.json" -exec jq -r '.status // empty' {} \; 2>/dev/null | grep -c "skipped" || echo "0")
else
    TOTAL_TESTS=0
    PASSED_TESTS=0
    FAILED_TESTS=0
    BROKEN_TESTS=0
    SKIPPED_TESTS=0
fi

# Ensure variables are numbers
TOTAL_TESTS=$(echo "${TOTAL_TESTS:-0}" | tr -d '\n' | xargs)
PASSED_TESTS=$(echo "${PASSED_TESTS:-0}" | tr -d '\n' | xargs)
FAILED_TESTS=$(echo "${FAILED_TESTS:-0}" | tr -d '\n' | xargs)
BROKEN_TESTS=$(echo "${BROKEN_TESTS:-0}" | tr -d '\n' | xargs)
SKIPPED_TESTS=$(echo "${SKIPPED_TESTS:-0}" | tr -d '\n' | xargs)

# Calculate success rate
if [ "$TOTAL_TESTS" -gt 0 ]; then
    SUCCESS_RATE=$((PASSED_TESTS * 100 / TOTAL_TESTS))
else
    SUCCESS_RATE=0
fi

# Determine status
if [ "$JOB_STATUS" == "success" ] && [ "$FAILED_TESTS" -eq 0 ] && [ "$BROKEN_TESTS" -eq 0 ]; then
    STATUS_COLOR="🟢"
    STATUS_TEXT="SUCCESS"
elif [ "$FAILED_TESTS" -gt 0 ] || [ "$BROKEN_TESTS" -gt 0 ]; then
    STATUS_COLOR="🔴"
    STATUS_TEXT="FAILED"
else
    STATUS_COLOR="🟡"
    STATUS_TEXT="PARTIAL"
fi

# Get test environment
TEST_ENV=${TEST_ENV:-"local"}
if [ "$TEST_ENV" == "browserstack" ]; then
    ENV_ICON="☁️"
    ENV_TEXT="BrowserStack"
elif [ "$TEST_ENV" == "saucelabs" ]; then
    ENV_ICON="🧪"
    ENV_TEXT="SauceLabs"
else
    ENV_ICON="💻"
    ENV_TEXT="Local"
fi

# Create descriptive text for zero values
if [ "$TOTAL_TESTS" -eq 0 ]; then
    TOTAL_TESTS_TEXT="No tests found"
else
    TOTAL_TESTS_TEXT="$TOTAL_TESTS"
fi

if [ "$PASSED_TESTS" -eq 0 ]; then
    PASSED_TESTS_TEXT="No tests passed"
else
    PASSED_TESTS_TEXT="$PASSED_TESTS"
fi

if [ "$FAILED_TESTS" -eq 0 ]; then
    FAILED_TESTS_TEXT="No failures"
else
    FAILED_TESTS_TEXT="$FAILED_TESTS"
fi

if [ "$BROKEN_TESTS" -eq 0 ]; then
    BROKEN_TESTS_TEXT="No broken tests"
else
    BROKEN_TESTS_TEXT="$BROKEN_TESTS"
fi

if [ "$SKIPPED_TESTS" -eq 0 ]; then
    SKIPPED_TESTS_TEXT="No skipped tests"
else
    SKIPPED_TESTS_TEXT="$SKIPPED_TESTS"
fi

# Build HTML-formatted message for Telegram
MESSAGE="🚀 <b>Mobile Test Automation Completed!</b>

📊 <b>Test Statistics:</b>
• <b>Total tests:</b> $TOTAL_TESTS_TEXT
• <b>Passed:</b> $PASSED_TESTS_TEXT ✅
• <b>Failed:</b> $FAILED_TESTS_TEXT ❌
• <b>Success rate:</b> ${SUCCESS_RATE}%

🔗 <b>Links:</b>
• <b>Repository:</b> https://github.com/$GITHUB_REPOSITORY
• <b>Commit:</b> https://github.com/$GITHUB_REPOSITORY/commit/$GITHUB_SHA
• <b>Report:</b> https://$GITHUB_REPOSITORY_OWNER.github.io/$GITHUB_EVENT_REPOSITORY_NAME/

$STATUS_COLOR <b>Status:</b> $STATUS_TEXT"

# Check if Telegram credentials are provided
if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
    echo "⚠️  Telegram credentials not provided. Skipping notification."
    echo "Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in your .env file"
    exit 0
fi

# Send message to Telegram using Bot API
RESPONSE=$(curl -s -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage" \
  -H "Content-Type: application/json" \
  -d "{
    \"chat_id\": \"$TELEGRAM_CHAT_ID\",
    \"text\": \"$MESSAGE\",
    \"parse_mode\": \"HTML\"
  }")

# Check if message was sent successfully
if echo "$RESPONSE" | grep -q '"ok":true'; then
    echo "✅ Telegram notification sent successfully!"
else
    echo "❌ Failed to send Telegram notification:"
    echo "$RESPONSE"
    exit 1
fi
