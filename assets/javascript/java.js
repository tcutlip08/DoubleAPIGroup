///////////////////////////////////////
////////////!!Live Video!!/////////
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
// $("#canvas").attr("width", "400");
// $("#canvas").attr("height", "300");
// var canvas = document.getElementById('canvas');
// var context = canvas.getContext('2d');
// var video = document.getElementById('liveVideo');

// console.log(canvas);
// console.log(context);
// console.log(video);

// context.drawImage(video, 0, 0, 400, 300);
// });

///////////////////////////////////////
////////////!!Face++ Testing!!/////////
///////////////////////////////////////

$("#onclick-show").hide();
$(".pickImage").on("click", function () {
    $("#first-page-hide").hide();
    $("#onclick-show").show();
});
$("#reset-btn").on("click", function () {
    $("#onclick-show").hide();
    $("#first-page-hide").show();
});

$(".pickImage").on("click", function () {

    var imgSrc = {
        fear: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/FearFace.jpg?raw=true",
        disgust: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/BaldWhiteDude.jpg?raw=true",
        neutral: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Praveen.jpg?raw=true",
        happy: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Jonathan.png?raw=true",
        surprise: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/SurpriseFace.jpg?raw=true",
        sad: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/SadKid.jpg?raw=true",
        angry: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/AngryFace.jpg?raw=true"
    };
    var chosenImgUrl;


    // sadness
    // neutral
    // disgust
    // anger
    // surprise
    // fear
    // happiness

    if ($(this).attr("id") === "fear") {
        chosenImgUrl = imgSrc.fear;
        $(".badge-secondary").text("Emotion: Fear");
        initMapforFear();
    } else if ($(this).attr("id") === "neutral") {
        chosenImgUrl = imgSrc.neutral;
        $(".badge-secondary").text("Emotion: Neutral");
        initMapforNeutral();
    } else if ($(this).attr("id") === "angry") {
        chosenImgUrl = imgSrc.angry;
        $(".badge-secondary").text("Emotion: Angry");
        initMapforAnger();
    } else if ($(this).attr("id") === "happy") {
        chosenImgUrl = imgSrc.happy;
        $(".badge-secondary").text("Emotion: Happy");
        initMapforHappiness();
    } else if ($(this).attr("id") === "disgust") {
        chosenImgUrl = imgSrc.disgust;
        $(".badge-secondary").text("Emotion: Disgust");
        initMapforDisgust();
    } else if ($(this).attr("id") === "sad") {
        chosenImgUrl = imgSrc.sad;
        $(".badge-secondary").text("Emotion: Sad");
        initMapforSadness();
    } else if ($(this).attr("id") === "surprise") {
        chosenImgUrl = imgSrc.surprise;
        $(".badge-secondary").text("Emotion: Surprise");
        initMapforSurprise();
    }

    var urlFaceToken = "https://api-us.faceplusplus.com/facepp/v3/detect"
    var api_Key = "api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF"
    var api_Secret = "api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm"
    var photo = chosenImgUrl;
    // var photo = $(".submitImage").val().trim();
    var queryURL = urlFaceToken + "?" + api_Key + "&image_url=" + photo + "&" + api_Secret;

    // console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "POST"
    })
        .then(function (response) {
            // console.log(response);
            var result = response.faces;

            // console.log(result[0].face_token);

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

///////////////////////////////////////
////////////!!FireBase Storage!!///////
///////////////////////////////////////

// const config = {
//     apiKey: "AIzaSyCDU6rYUeS3vBdWWsfuZGJQu07AHLGU7kU",
//     authDomain: "doubleapigroup-5d285.firebaseapp.com",
//     databaseURL: "https://doubleapigroup-5d285.firebaseio.com",
//     projectId: "doubleapigroup-5d285",
//     storageBucket: "doubleapigroup-5d285.appspot.com",
//     messagingSenderId: "518885986314",
//     appId: "1:518885986314:web:7767e302d24f7613"
// };

// firebase.initializeApp(config);
// var database = firebase.database();

///////////////////////////////////////
////////////!!FireBase Storage!!///////
///////////////////////////////////////

/* var broadway = {
    info:
        '<strong>Chipotle on Broadway</strong><br>\
            5224 N Broadway St<br> Chicago, IL 60640<br>\
            <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
    lat: 41.976816,
    long: -87.659916,
}

var places = {
    broadway: {info: '<strong>Chipotle on Broadway</strong><br>\5224 N Broadway St<br> Chicago, IL 60640<br>\<a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',}
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
} */

function initMapforSadness() {
    var broadway = {
        info:
            '<strong>Piedmont Park</strong><br>\
            400 Park Dr NE<br> Atlanta, GA 30306<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 33.786839,
        long: -84.372849,
    }

    var belmont = {
        info:
            '<strong>The Vortex</strong><br>\
            438 Moreland Ave NE<br> Atlanta, GA 30307<br>\
          <a href="https://goo.gl/maps/FZbMbxJpcEsG2pd88">Get Directions</a>',
        lat: 33.766350,
        long: -84.349370,
    }

    var sheridan = {
        info:
            '<strong>bliss spa</strong><br>\r\
            45 Ivan Allen Jr Blvd NW<br> Atlanta, GA 30308<br>\
          <a href="https://goo.gl/maps/2QpXsEgm5JpDpnsn7">Get Directions</a>',
        lat:  33.765110,
        long: -84.389220,
    }

    var meridian = {
        info:
            '<strong>punchline</strong><br>\r\
            3652 Roswell Rd<br> Atlanta, GA 30342<br>\
          <a href="https://goo.gl/maps/8uMActGu1X9DNZ3q9">Get Directions</a>',
        lat: 33.883970,
        long: -84.379090,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3],
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
            position: new google.maps.LatLng(locations[i][1], locations[i][2], locations[i][2]),
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
            '<strong>Midtown Blood Donation Center</strong><br>\
            1955 Monroe Drive<br> Atlanta, GA 30324<br>\
          <a href="https://goo.gl/maps/r1FSjjaDhCxHkTcr7">Get Directions</a>',
        lat: 33.759080,
        long: -84.392200,
    }

    var belmont = {
        info:
            '<strong>Hands On Atlanta</strong><br>\
            600 Means St NW #100<br> Atlanta, GA 30318<br>\
          <a href="https://goo.gl/maps/h85a4zUmDWowDoci9">Get Directions</a>',
        lat: 33.748550,
        long: -84.391500,
    }

    var sheridan = {
        info:
            '<strong>World of Coca-Cola</strong><br>\r\
            121 Baker St NW<br> Atlanta, GA 30313<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat:  35.752060,
        long: -87.661236,
    }

    var meridian = {
        info:
            '<strong>World of Coca-Cola</strong><br>\r\
            121 Baker St NW<br> Atlanta, GA 30313<br>\
          <a href="https://goo.gl/maps/QGUrqZPsYp92">Get Directions</a>',
        lat:  35.752060,
        long: -87.661236,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(33.772163578, -84.390165106),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2], locations[i][2]),
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
            '<strong>Piedmont Park</strong><br>\
            400 Park Dr NE<br> Atlanta, GA 30306<br>\
          <a href="https://goo.gl/maps/jKNEDz4SyyH2">Get Directions</a>',
        lat: 33.786839,
        long: -84.372849,
    }

    var belmont = {
        info:
            '<strong>Cathedral of Christ the King</strong><br>\
            2699 Peachtree Rd NE<br> Atlanta, GA 30305<br>\
          <a href="https://goo.gl/maps/3rj3AurBBrs8LJ3x6">Get Directions</a>',
        lat: 33.828120,
        long: -84.386480,
    }

    var sheridan = {
        info:
            '<strong>bliss spa</strong><br>\r\
            45 Ivan Allen Jr Blvd NW<br> Atlanta, GA 30308<br>\
          <a href="https://goo.gl/maps/2QpXsEgm5JpDpnsn7">Get Directions</a>',
        lat:  33.765110,
        long: -84.389220,
    }

    var meridian = {
        info:
            '<strong>punchline</strong><br>\r\
            3652 Roswell Rd<br> Atlanta, GA 30342<br>\
          <a href="https://goo.gl/maps/8uMActGu1X9DNZ3q9">Get Directions</a>',
        lat: 33.883970,
        long: -84.379090,
    }


    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(33.772163578, -84.390165106),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2],locations[i][3]),
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
            '<strong>Cathedral of Christ the King</strong><br>\
            2699 Peachtree Rd NE<br> Atlanta, GA 30305<br>\
          <a href="https://goo.gl/maps/3rj3AurBBrs8LJ3x6">Get Directions</a>',
        lat: 33.828120,
        long: -84.386480,
    }

    var belmont = {
        info:
            '<strong>The Vortex</strong><br>\
            438 Moreland Ave NE<br> Atlanta, GA 30307<br>\
          <a href="https://goo.gl/maps/FZbMbxJpcEsG2pd88">Get Directions</a>',
        lat: 33.766350,
        long: -84.349370,
    }

    var sheridan = {
        info:
            '<strong>bliss spa</strong><br>\r\
            45 Ivan Allen Jr Blvd NW<br> Atlanta, GA 30308<br>\
          <a href="https://goo.gl/maps/2QpXsEgm5JpDpnsn7">Get Directions</a>',
        lat:  33.765110,
        long: -84.389220,
    }

    var meridian = {
        info:
            '<strong>punchline</strong><br>\r\
            3652 Roswell Rd<br> Atlanta, GA 30342<br>\
          <a href="https://goo.gl/maps/8uMActGu1X9DNZ3q9">Get Directions</a>',
        lat: 33.883970,
        long: -84.379090,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3],
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(33.772163578, -84.390165106),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2], locations[i][3]),
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
            '<strong>Georgia aquarium</strong><br>\
            225 Baker St NW<br> Atlanta, GA 30313<br>\
          <a href="https://goo.gl/maps/ttbiPLbqzUG7kpBG8">Get Directions</a>',
        lat: 33.763500,
        long: -84.395111,
    }

    var belmont = {
        info:
            '<strong>zoo atlanta</strong><br>\
            800 Cherokee Ave SE<br> Atlanta, GA 30315<br>\
          <a href="https://goo.gl/maps/hMuoRuehQ7YXWeRy7">Get Directions</a>',
        lat: 33.733761,
        long: -84.372063,
    }

    var sheridan = {
        info:
            '<strong>bliss spa</strong><br>\r\
            45 Ivan Allen Jr Blvd NW<br> Atlanta, GA 30308<br>\
          <a href="https://goo.gl/maps/2QpXsEgm5JpDpnsn7">Get Directions</a>',
        lat:  33.765110,
        long: -84.389220,
    }

    var meridian = {
        info:
            '<strong>punchline</strong><br>\r\
            3652 Roswell Rd<br> Atlanta, GA 30342<br>\
          <a href="https://goo.gl/maps/8uMActGu1X9DNZ3q9">Get Directions</a>',
        lat: 33.883970,
        long: -84.379090,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3],
    ]

    

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(33.772163578, -84.390165106),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2],locations[i][3]),
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
            '<strong>Cathedral of Christ the King</strong><br>\
            2699 Peachtree Rd NE<br> Atlanta, GA 30305<br>\
          <a href="https://goo.gl/maps/3rj3AurBBrs8LJ3x6">Get Directions</a>',
        lat: 33.828120,
        long: -84.386480,
    }

    var belmont = {
        info:
            '<strong>The Vortex</strong><br>\
            438 Moreland Ave NE<br> Atlanta, GA 30307<br>\
          <a href="https://goo.gl/maps/FZbMbxJpcEsG2pd88">Get Directions</a>',
        lat: 33.766350,
        long: -84.349370,
    }

    var sheridan = {
        info:
            '<strong>Emory Proton Therapy Center</strong><br>\r\
            615 Peachtree St NE<br> Atlanta, GA 30308<br>\
          <a href="https://goo.gl/maps/PiRQP68VxrMp2PJL9">Get Directions</a>',
        lat:  33.765110,
        long: -84.389220,
    }

    var meridian = {
        info:
            '<strong>punchline</strong><br>\r\
            3652 Roswell Rd<br> Atlanta, GA 30342<br>\
          <a href="https://goo.gl/maps/8uMActGu1X9DNZ3q9">Get Directions</a>',
        lat: 33.883970,
        long: -84.379090,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3],
    ]

    

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(33.772163578, -84.390165106),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2],locations[i][3]),
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

function initMapforDisgust() {
    var broadway = {
        info:
            '<strong>Cathedral of Christ the King</strong><br>\
            2699 Peachtree Rd NE<br> Atlanta, GA 30305<br>\
          <a href="https://goo.gl/maps/3rj3AurBBrs8LJ3x6">Get Directions</a>',
        lat: 33.828120,
        long: -84.386480,
    }

    var belmont = {
        info:
            '<strong>Atlanta Symphony Orchestra</strong><br>\
            1280 Peachtree St NE<br> Atlanta, GA 30309<br>\
          <a href="https://goo.gl/maps/gSjFQvaQbtpxYJX37">Get Directions</a>',
        lat: 41.93967,
        long: -87.655167,
    }

    var sheridan = {
        info:
            '<strong>bliss spa</strong><br>\r\
            45 Ivan Allen Jr Blvd NW<br> Atlanta, GA 30308<br>\
          <a href="https://goo.gl/maps/2QpXsEgm5JpDpnsn7">Get Directions</a>',
        lat:  33.765110,
        long: -84.389220,
    }


    var meridian = {
        info:
            '<strong>punchline</strong><br>\r\
            3652 Roswell Rd<br> Atlanta, GA 30342<br>\
          <a href="https://goo.gl/maps/8uMActGu1X9DNZ3q9">Get Directions</a>',
        lat: 33.883970,
        long: -84.379090,
    }

    var locations = [
        [broadway.info, broadway.lat, broadway.long, 0],
        [belmont.info, belmont.lat, belmont.long, 1],
        [sheridan.info, sheridan.lat, sheridan.long, 2],
        [meridian.info, meridian.lat, meridian.long, 3]
    ]

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: new google.maps.LatLng(33.772163578, -84.390165106),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    })

    var infowindow = new google.maps.InfoWindow({})

    var marker, i

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2],locations[i][3]),
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
};

