<<<<<<< HEAD
//Permission to access cam and stream video and audio

/* <!--         <input type="file" accept="image/*;capture=camera">
<input type="file" accept="video/*;capture=camcorder">
<input type="file" accept="audio/*;capture=microphone"> -->
<device type="media" onchange="update(this.data)"></device>
<video autoplay></video> */

function update(stream) {
    document.querySelector('video').src = stream.url;
}

function hasGetUserMedia() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
    // Good to go!
} else {
    alert('This function is not supported!');
}

const constraints = {
    video: true
};

const video = document.querySelector('video');

navigator.mediaDevices.getUserMedia(constraints).
    then((stream) => { video.srcObject = stream });


const videoElement = document.querySelector('video');
const audioSelect = document.querySelector('select#audioSource');
const videoSelect = document.querySelector('select#videoSource');

navigator.mediaDevices.enumerateDevices()
    .then(gotDevices).then(getStream).catch(handleError);

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

function gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        const option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
            option.text = deviceInfo.label ||
                'microphone ' + (audioSelect.length + 1);
            audioSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
            option.text = deviceInfo.label || 'camera ' +
                (videoSelect.length + 1);
            videoSelect.appendChild(option);
        } else {
            console.log('Found another kind of device: ', deviceInfo);
        }
    }
}

function getStream() {
    if (window.stream) {
        window.stream.getTracks().forEach(function (track) {
            track.stop();
        });
    }

    const constraints = {
        audio: {
            deviceId: { exact: audioSelect.value }
        },
        video: {
            deviceId: { exact: videoSelect.value }
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).
        then(gotStream).catch(handleError);
}

function gotStream(stream) {
    window.stream = stream; // make stream available to console
    videoElement.srcObject = stream;
}

function handleError(error) {
    console.error('Error: ', error);
}
=======
$(document).ready(function () {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true},
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

console.log("hey");
>>>>>>> 70b5ca230d761948eea6114121d177bf8071c2bb
