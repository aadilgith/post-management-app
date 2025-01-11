// Middleware for logging requests
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next(); // Pass control to the next handler
  };
  
  module.exports = logger;
  