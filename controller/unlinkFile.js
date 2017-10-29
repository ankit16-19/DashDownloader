const fs = require('fs');

moudle.exports = function (queryData, callback) {

    var file = queryData.file;
    fs.unlink(__dirname + '\..\Downloads' + file, function (err) {
        if(!err){
            conosle.log("Deleted" + file);
            callback("done");
        }
    })
};