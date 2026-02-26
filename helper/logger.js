// helper/logger.js

const formatMessage = (level, tag, message) => {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${tag}] ${message}`;
};

exports.logger = {
    info: (tag, message) => {
        console.log(formatMessage("INFO", tag, message));
    },

    error: (tag, message) => {
        console.error(formatMessage("ERROR", tag, message));
    }
    
};