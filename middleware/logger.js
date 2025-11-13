// middleware/logger.js
const logger = (req, res, next) => {
    const timestamp = Date.now(); 
    const method = req.method;
    const url = req.url;

    // Output ke console: [Timestamp] Method URL (Persyaratan)
    console.log(`[${timestamp}] ${method} ${url}`);
    
    next(); // Lanjutkan ke handler berikutnya
};

module.exports = logger;