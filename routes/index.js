var express = require('express');
var router = express.Router();
var ffmpeg = require('ffmpeg');
var exec = require('child_process').exec;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'YT-Custom' });
});

// try {
//     var process = new ffmpeg('./test-files/theOne.mp4');
//     process.then(function (video) {
//         // Video metadata
//         // console.log(video.metadata);
//         // FFmpeg configuration
//         // console.log(video.info_configuration);
//         video.addCommand('-f', 'avi');
//
//     }, function (err) {
//         console.log('Error: ' + err);
//     });
// } catch (e) {
//     console.log(e.code);
//     console.log(e.msg);
// }

var pallete = 'ffmpeg -y -ss 100 -t 3 -i ./test-files/theOne.mp4 -vf fps=10,scale=320:-1:flags=lanczos,palettegen palette.png';
var output = 'ffmpeg -ss 100 -t 3 -i ./test-files/theOne.mp4 -i palette.png -filter_complex "fps=10,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse" ./output-files/output.gif';

exec(pallete, function(err, stdout, stderr){
    if (err) {
        // node couldn't execute the command
        return;
    }

    //generates gif
    exec(output, function(err, stdout, stderr){
        if (err) {
            // node couldn't execute the command
            return;
        }
        // the *entire* stdout and stderr (buffered)
        // console.log('stdout:', stdout);
        // console.log('stderr:', stderr);
        console.log("Finished...");

    });


    // the *entire* stdout and stderr (buffered)
    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);
});

module.exports = router;
