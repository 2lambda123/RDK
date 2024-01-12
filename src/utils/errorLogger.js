// src/utils/errorLogger.js

const fs = require('fs');
const path = require('path');
const moment = require('moment');

const logError = (error) => {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const errorMessage = `[${timestamp}] ${error.stack || error.message}\n`;

  const logFilePath = path.join(__dirname, '../logs/error.log');

  fs.appendFile(logFilePath, errorMessage, (err) => {
    if (err) {
      console.error('Error writing to error log:', err);
    }
  });
};

const analyzeError = (error) => {
  // Perform error analysis and actions based on error type
  // Customize this function as needed
};

module.exports = {
  logError,
  analyzeError,
};
