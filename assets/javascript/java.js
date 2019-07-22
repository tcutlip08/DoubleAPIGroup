///////////////////////////////////////
////////////!!Face++ Testing!!/////////
///////////////////////////////////////

// API Key SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF
// API Secret FLbaJQnABWlZEuXnxh16n-pgalV760vm
// https://api-us.faceplusplus.com/facepp/v3/detect
// https://api-us.faceplusplus.com/facepp/v3/face/analyze?api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF&api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm
// https://mail.google.com/mail/u/0?ui=2&ik=469f8e69d7&attid=0.1&permmsgid=msg-a:r4724190948597656535&th=16bee75430922fb7&view=att&disp=safe&realattid=f_jy2drxwz0


// $(document).ready(function () {
//     navigator.getUserMedia = navigator.getUserMedia ||
//         navigator.webkitGetUserMedia ||
//         navigator.mozGetUserMedia;

//     if (navigator.getUserMedia) {
//         navigator.getUserMedia({ video: true },
//             function (stream) {
//                 var video = document.querySelector('video');
//                 video.srcObject = stream;
//                 video.onloadedmetadata = function (e) {
//                     video.play();
//                 };
//             },
//             function (err) {
//                 console.log("The following error occurred: " + err.name);
//             }
//         );
//     } else {
//         console.log("getUserMedia not supported");
//     }
// });

// $(".pickImage").on("click", function () {
$(".submitButton").on("click", function (event) {
    event.preventDefault();

    var imgSrc = {
        nate: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Nate.jpg?raw=true",
        baldWhiteDude: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/BaldWhiteDude.jpg?raw=true",
        aaron: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Aaron.JPG?raw=true",
        praveen: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Praveen.jpg?raw=true",
        jonathan: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Jonathan.png?raw=true",
        notAsBaldBlackDude: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/NotAsBaldBlackDude.png?raw=true"
    }
    var chosenImgUrl;

    // $("#canvas").attr("width", "400");
    // $("#canvas").attr("height", "300");
    // var canvas = document.getElementById('canvas');
    // var context = canvas.getContext('2d');
    // var video = document.getElementById('liveVideo');

    // console.log(canvas);
    // console.log(context);
    // console.log(video);

    // context.drawImage(video, 0, 0, 400, 300);

    // sadness
    // neutral
    // disgust
    // anger
    // surprise
    // fear
    // happiness

    if ($(this).attr("id") === "nate") {
        chosenImgUrl = imgSrc.nate; // happy
    } else if ($(this).attr("id") === "praveen") {
        chosenImgUrl = imgSrc.praveen; // nuetral
    } else if ($(this).attr("id") === "aaron") {
        chosenImgUrl = imgSrc.aaron; // happy
    } else if ($(this).attr("id") === "jonathan") {
        chosenImgUrl = imgSrc.jonathan; // happy
    } else if ($(this).attr("id") === "baldWhiteDude") {
        chosenImgUrl = imgSrc.baldWhiteDude; // disgust
    } else if ($(this).attr("id") === "notAsBaldBlackDude") {
        chosenImgUrl = imgSrc.notAsBaldBlackDude; // disgust
    }

    var urlFaceToken = "https://api-us.faceplusplus.com/facepp/v3/detect"
    var api_Key = "api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF"
    var api_Secret = "api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm"
    // var photo = chosenImgUrl;
    var photo = $(".submitImage").val().trim();
    var queryURL = urlFaceToken + "?" + api_Key + "&image_url=" + photo + "&" + api_Secret;

    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "POST"
    })
        .then(function (response) {
            console.log(response);
            var result = response.faces;

            console.log(result[0].face_token);

            var urlEmotions = "https://api-us.faceplusplus.com/facepp/v3/detect"
            var returnAttributes = "return_attributes=emotion"
            queryURL = urlEmotions + "?" + api_Key + "&image_url=" + photo + "&" + api_Secret + "&face_tokens" + "&" + returnAttributes
            $.ajax({
                url: queryURL,
                method: 'POST'
            }).then(function (response) {
                result = response.faces;
                var currentEmotion = findCurrentEmotion(result[0].attributes.emotion);
                console.log(currentEmotion);
            });
        });
});

function findCurrentEmotion(allEmo) {
    console.log("Find Emotion Function!!");
    console.log(allEmo);

    var anger = allEmo.anger;
    var fear = allEmo.fear;
    var disgust = allEmo.disgust;
    var happiness = allEmo.happiness;
    var neutral = allEmo.neutral;
    var sadness = allEmo.sadness;
    var surprise = allEmo.surprise;

    var allEmotions = [anger, fear, disgust, happiness, neutral, sadness, surprise];

    var currentEmotion = 0;
    for (let i = 0; i < allEmotions.length; i++) {
        if (currentEmotion < allEmotions[i]) {
            currentEmotion = allEmotions[i];
        }
    }

    if (currentEmotion === anger) {
        return "anger";
    } else if (currentEmotion === fear) {
        return "fear";
    } else if (currentEmotion === disgust) {
        return "disgust";
    } else if (currentEmotion === happiness) {
        return "happiness";
    } else if (currentEmotion === neutral) {
        return "neutral";
    } else if (currentEmotion === sadness) {
        return "sadness";
    } else if (currentEmotion === surprise) {
        return "surprise";
    } else {
        console.log("No returned emotion")
    }
}

const config = {
    apiKey: "AIzaSyCDU6rYUeS3vBdWWsfuZGJQu07AHLGU7kU",
    authDomain: "doubleapigroup-5d285.firebaseapp.com",
    databaseURL: "https://doubleapigroup-5d285.firebaseio.com",
    projectId: "doubleapigroup-5d285",
    storageBucket: "doubleapigroup-5d285.appspot.com",
    messagingSenderId: "518885986314",
    appId: "1:518885986314:web:7767e302d24f7613"
};

firebase.initializeApp(config);
var database = firebase.database();

const storageService = firebase.storage();
const storageRef = storageService.ref();

// document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
// $(".file-select").on("change", handleFileUploadChange);
// document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

// let selectedFile;

// function handleFileUploadChange(e) {
//     selectedFile = e.target.files[0];
// }

// function handleFileUploadSubmit(e) {
//     const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);
//     //create a child directory called images, and place the file inside this directory

//     uploadTask.on('state_changed', (snapshot) => {
//         // Observe state change events such as progress, pause, and resume
//     }, (error) => {
//         // Handle unsuccessful uploads
//         console.log(error);
//     }, () => {
//         // Do something once upload is complete
//         console.log('success');
//     });
// }

///////////////////////////////////////
////////////!!Face++ Testing!!/////////
///////////////////////////////////////

var broadway = {
    info:
        '<strong>Chipotle on Broadway</strong><br>\
            5224 N Broadway St<br> Chicago, IL 60640<br>\
            <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
    lat: 41.976816,
    long: -87.659916,
}

var belmont = {
    info:
        '<strong>Chipotle on Belmont</strong><br>\
            1025 W Belmont Ave<br> Chicago, IL 60657<br>\
            <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
    lat: 41.93967,
    long: -87.655167,
}

var sheridan = {
    info:
        '<strong>Chipotle on Sheridan</strong><br>\r\
            6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
            <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
    lat: 42.002707,
    long: -87.661236,
}

//   var locations = {
//     broadway: {info: '<strong>Chipotle on Belmont</strong><br>\ 1025 W Belmont Ave<br> Chicago, IL 60657<br>\ <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>'}
//   }

//Sadness

function initMapforSadness() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}


//Happiness

function initMapforHappiness() {
    var broadway = {
        info:
            '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 41.976816,
        long: -87.659916,
    }

    var belmont = {
        info:
            '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat: 42.002707,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}


//Neutral

function initMapforNeutral() {
    var broadway = {
        info:
            '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 41.976816,
        long: -87.659916,
    }

    var belmont = {
        info:
            '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat: 42.002707,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}


//Anger

function initMapforAnger() {
    var broadway = {
        info:
            '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 41.976816,
        long: -87.659916,
    }

    var belmont = {
        info:
            '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat: 42.002707,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}


//Surprise

function initMapforSurprise() {
    var broadway = {
        info:
            '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 41.976816,
        long: -87.659916,
    }

    var belmont = {
        info:
            '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat: 42.002707,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}

//Fear

function initMapforFear() {
    var broadway = {
        info:
            '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 41.976816,
        long: -87.659916,
    }

    var belmont = {
        info:
            '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat: 42.002707,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}


//Fear

function initMapforFear() {
    var broadway = {
        info:
            '<strong>Chipotle on Broadway</strong><br>\
          5224 N Broadway St<br> Chicago, IL 60640<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 41.976816,
        long: -87.659916,
    }

    var belmont = {
        info:
            '<strong>Chipotle on Belmont</strong><br>\
          1025 W Belmont Ave<br> Chicago, IL 60657<br>\
          <a href="https://goo.gl/maps/PHfsWTvgKa92">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>Chipotle on Sheridan</strong><br>\r\
          6600 N Sheridan Rd<br> Chicago, IL 60626<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat: 42.002707,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(41.976816, -87.659916),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
        })

        google.maps.event.addListener(
            marker,
            'click',
            (function (marker, i) {
                return function () {
                    infowindow.setContent(locations[i][0])
                    infowindow.open(map, marker)
                }
            })(marker, i)
        )
    }
}


