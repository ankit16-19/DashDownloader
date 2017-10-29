const Downloader = require('mt-files-downloader');
var downloader = new Downloader();
var os = require('os');


module.exports = function (post_data, io, callback) {

    console.log(os.cpus());
    console.log(os.totalmem());
    console.log(os.freemem());



    var dl = downloader.download('http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_5mb.mp4', __dirname + '\\..\\Downloads\\' + '5.mp4');

    dl.on('end' , function(dl){
        console.log('done');
        callback("done");
    });

    dl.on('error',function (dl) {
        console.log(dl.error);
    });

    dl.start();


    var num = 1;

    var timer = setInterval(function() {
        if(dl.status === 0) {
            console.log('Download '+ num +' not started.');
        } else if(dl.status === 1) {
            var stats = dl.getStats();
            console.log('Download '+ num +' is downloading:');
            console.log('Download progress: '+ stats.total.completed +' %');
            console.log('Download speed: '+ Downloader.Formatters.speed(stats.present.speed));
            console.log('Download time: '+ Downloader.Formatters.elapsedTime(stats.present.time));
            io.emit("data", Downloader.Formatters.speed(stats.present.speed));
            console.log('Download ETA: '+ Downloader.Formatters.remainingTime(stats.future.eta));
        } else if(dl.status === 2) {
            console.log('Download '+ num +' error... retrying');
        } else if(dl.status === 3) {
            console.log('Download '+ num +' completed !');
        } else if(dl.status === -1) {
            console.log('Download '+ num +' error : '+ dl.error);
        } else if(dl.status === -2) {
            console.log('Download '+ num +' stopped.');
        } else if(dl.status === -3) {
            console.log('Download '+ num +' destroyed.');
        }

        console.log('------------------------------------------------');

        if(dl.status === -1 || dl.status === 3 || dl.status === -3) {
            clearInterval(timer);
            timer = null;
        }
    }, 1000);

};