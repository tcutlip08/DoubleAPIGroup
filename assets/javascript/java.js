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
        nate: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Nate.jpg?raw=true",
        baldWhiteDude: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/BaldWhiteDude.jpg?raw=true",
        aaron: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Aaron.JPG?raw=true",
        praveen: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Praveen.jpg?raw=true",
        jonathan: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/Jonathan.png?raw=true",
        notAsBaldBlackDude: "https://github.com/tcutlip08/DoubleAPIGroup/blob/master/assets/images/NotAsBaldBlackDude.png?raw=true"
    };
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
    if ($(this).attr("id") === "nate") {
        chosenImgUrl = imgSrc.nate;
    } else if ($(this).attr("id") === "praveen") {
        chosenImgUrl = imgSrc.praveen;
    } else if ($(this).attr("id") === "aaron") {
        chosenImgUrl = imgSrc.aaron;
    } else if ($(this).attr("id") === "jonathan") {
        chosenImgUrl = imgSrc.jonathan;
    } else if ($(this).attr("id") === "baldWhiteDude") {
        chosenImgUrl = imgSrc.baldWhiteDude;
    } else if ($(this).attr("id") === "notAsBaldBlackDude") {
        chosenImgUrl = imgSrc.notAsBaldBlackDude;
    }

    var urlFaceToken = "https://api-us.faceplusplus.com/facepp/v3/detect"
    var api_Key = "api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF"
    var api_Secret = "api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm"
    var photo = chosenImgUrl;
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
