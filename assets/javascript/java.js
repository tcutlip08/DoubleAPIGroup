$(document).ready(function () {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true },
            function (stream) {
                var video = document.querySelector('video');
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            },
            function (err) {
                console.log("The following error occurred: " + err.name);
            }
        );
    } else {
        console.log("getUserMedia not supported");
    }
});

$("#takePhoto").on("click", function () {
    $("#canvas").attr("width", "400");
    $("#canvas").attr("height", "300");
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video = document.getElementById('liveVideo');

    console.log(canvas);
    console.log(context);
    console.log(video);

    context.drawImage(video, 0, 0, 400, 300);
});