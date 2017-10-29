const fs = require("fs");

module.exports = function (queryData, callback) {

  fs.readdir(__dirname + '\\..\\Downloads', function (err, files) {
    console.log( files );
    callback(files);
  });

};