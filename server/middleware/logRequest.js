// Log requests in Development
const logRequests = (req, _res, next) => {
  console.log(`Request TO: ${req.url} | Method: ${req.method}`);
  next();
};

module.exports = { logRequests };
