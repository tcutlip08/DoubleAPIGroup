
function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map");
    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
        mapdiv.style.width = '100%';
        mapdiv.style.height = '100%';
    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}
var myLatLng;
var latit;
var longit;
function geoSuccess(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    myLatLng = {
        lat: latitude,
        lng: longitude
    };
    console.log(myLatLng);

    var mapProp = {
        //            center: new google.maps.LatLng(latitude, longitude), // puts your current location at the centre of the map,
        zoom: 8,
        mapTypeId: 'roadmap',
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    //call renderer to display directions
    directionsDisplay.setMap(map);
    var bounds = new google.maps.LatLngBounds();
    //        var mapOptions = {
    //            mapTypeId: 'roadmap'
    //        };
    // Multiple Markers
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'My location'
    });
    var markers = [
        ['Atlanta Botanical Garden', 33.788181, -84.371338],
        ['Georgia Dome', 33.754496982, -84.400498398]
    ];
    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
            '<h3>Atlanta Botanical Garden</h3>' +
            '<p>1345 Piedmont Ave NE, Atlanta, GA 30309</p>' +
            '<img src="" width="200" height="200">' +
            '</div>'
        ],
        ['<div class="info_content">' +
            '<h3>Georgia Dome</h3>' +
            '<p>130 Northside Dr NW, Atlanta, GA 30314</p>' +
            '<img src="" width="200" height="200">' +
            '</div>'
        ]
    ];
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
        marker, i;
    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
                latit = marker.getPosition().lat();
                longit = marker.getPosition().lng();
                // console.log("lat: " + latit);
                // console.log("lng: " + longit);
            }
        })(marker, i));
        marker.addListener('click', function () {
            directionsService.route({
                // origin: document.getElementById('start').value,
                origin: myLatLng,
                // destination: marker.getPosition(),
                destination: {
                    lat: latit,
                    lng: longit
                },
                travelMode: 'DRIVING'
            }, function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        });
        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}
function geoError() {
    alert("Geocoder failed.");
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        // alert("Geolocation is supported by this browser.");
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}


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


// $("#takePhoto").on("click", function () {
//     $("#canvas").attr("width", "400");
//     $("#canvas").attr("height", "300");
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');
//     var video = document.getElementById('liveVideo');

//     // console.log(canvas);
//     // console.log(context);
//     // console.log(video);

//     context.drawImage(video, 0, 0, 400, 300);

//     var url = "https://api-us.faceplusplus.com/facepp/v3/detect"
//     var api_Key = "api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF"
//     var api_Secret = "api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm"
//     // var photoToSearch = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
//     var photo = "https://mail.google.com/mail/u/0?ui=2&ik=469f8e69d7&attid=0.1&permmsgid=msg-a:r4724190948597656535&th=16bee75430922fb7&view=att&disp=safe&realattid=f_jy2drxwz0";
//     var returnAttributes = "return_attributes=emotion"
//     var queryURL = url + "?" + api_Key + "&" + api_Secret + "&image_url=" + photo + "&return_facekey";

//     // https://scstylecaster.files.wordpress.com/2016/12/model-curly-hair-nose-ring.jpg

//     console.log(queryURL);

//     $.ajax({
//         url: queryURL,
//         method: "POST"
//     })
//         .then(function (response) {
//             console.log(response);
//             var results = response.data;
//             console.log(results);

//             // for (var i = 0; i < results.length; i++) {

//             //     var gifDiv = $("<div>");
//             //     gifDiv.addClass("card w-75 text-center");

//             //     var rating = results[i].rating;

//             //     var p = $("<h5>").html("Rating: " + rating);

//             //     var gifImage = $("<img>");
//             //     gifImage.addClass("gif");
//             //     gifImage.attr("src", results[i].images.fixed_width_still.url);
//             //     gifImage.attr("data-still", results[i].images.fixed_width_still.url);
//             //     gifImage.attr("data-animate", results[i].images.fixed_width.url);
//             //     gifImage.attr("data-state", "still");
//             //     gifImage.attr("style", "padding: 10px");

//             //     var imageTitle = $("<h4>");
//             //     imageTitle.addClass("gifTitle");
//             //     var title = (results[i].title.split(" GIF"));
//             //     imageTitle.html(title[0].toUpperCase());

//             //     var imageDetail = $("<div>");
//             //     imageDetail.addClass("imageDetail");
//             //     imageDetail.append(imageTitle);

//             //     var favButton = $("<button>");
//             //     favButton.addClass("btn btn-primary").attr("id", "favBtn").text("✩Favorites");

//             //     gifDiv.prepend(favButton);
//             //     gifDiv.prepend(p);
//             //     gifDiv.prepend(imageDetail);
//             //     gifDiv.prepend(gifImage);

//             //     $("#displayGifs").prepend("<br>")
//             //     $("#displayGifs").prepend(gifDiv);
//             // }
//         });
// });

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

document.querySelector('.file-select').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let selectedFile;

function handleFileUploadChange(e) {
    selectedFile = e.target.files[0];
}

function handleFileUploadSubmit(e) {
    const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);
    //create a child directory called images, and place the file inside this directory

    uploadTask.on('state_changed', (snapshot) => {
        // Observe state change events such as progress, pause, and resume
    }, (error) => {
        // Handle unsuccessful uploads
        console.log(error);
    }, () => {
        // Do something once upload is complete
        console.log('success');
    });
}

    ///////////////////////////////////////
    ////////////!!Face++ Testing!!/////////
    ///////////////////////////////////////