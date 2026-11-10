const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} isteği geldi -> ${req.originalUrl}`);
    next(); // İstek döngüsünün devam etmesi için next() 
};

module.exports = logger;