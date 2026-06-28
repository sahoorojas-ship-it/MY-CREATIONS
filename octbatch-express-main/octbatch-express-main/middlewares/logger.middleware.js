var fs = require("fs");
var path = require("path");
function logger(req, res, next) {
  let log_path = path.resolve("log", "log.txt");
  fs.appendFile(log_path, req.path, (err) => {
    if (err) console.log(err);
  });
  next();
}

module.exports = { logger };
