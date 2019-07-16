// API Key SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF
// API Secret FLbaJQnABWlZEuXnxh16n-pgalV760vm
// https://api-us.faceplusplus.com/facepp/v3/detect
// https://api-us.faceplusplus.com/facepp/v3/face/analyze?api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF&api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm
// https://mail.google.com/mail/u/0?ui=2&ik=469f8e69d7&attid=0.1&permmsgid=msg-a:r4724190948597656535&th=16bee75430922fb7&view=att&disp=safe&realattid=f_jy2drxwz0


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

    // console.log(canvas);
    // console.log(context);
    // console.log(video);

    context.drawImage(video, 0, 0, 400, 300);

    var url = "https://api-us.faceplusplus.com/facepp/v3/detect"
    var api_Key = "api_key=SGDsWC-LfRIlK-6AapwjGbUDWcHOR1gF"
    var api_Secret = "api_secret=FLbaJQnABWlZEuXnxh16n-pgalV760vm"
    var photoToSearch = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var returnAttributes = "return_attributes=emotion"
    var queryURL = url + "?" + api_Key + "&" + api_Secret + "&image_url=" + photoToSearch;

    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "POST"
    })
        .then(function (response) {
            console.log(response);
            var results = response.data;

            // for (var i = 0; i < results.length; i++) {

            //     var gifDiv = $("<div>");
            //     gifDiv.addClass("card w-75 text-center");

            //     var rating = results[i].rating;

            //     var p = $("<h5>").html("Rating: " + rating);

            //     var gifImage = $("<img>");
            //     gifImage.addClass("gif");
            //     gifImage.attr("src", results[i].images.fixed_width_still.url);
            //     gifImage.attr("data-still", results[i].images.fixed_width_still.url);
            //     gifImage.attr("data-animate", results[i].images.fixed_width.url);
            //     gifImage.attr("data-state", "still");
            //     gifImage.attr("style", "padding: 10px");

            //     var imageTitle = $("<h4>");
            //     imageTitle.addClass("gifTitle");
            //     var title = (results[i].title.split(" GIF"));
            //     imageTitle.html(title[0].toUpperCase());

            //     var imageDetail = $("<div>");
            //     imageDetail.addClass("imageDetail");
            //     imageDetail.append(imageTitle);

            //     var favButton = $("<button>");
            //     favButton.addClass("btn btn-primary").attr("id", "favBtn").text("✩Favorites");

            //     gifDiv.prepend(favButton);
            //     gifDiv.prepend(p);
            //     gifDiv.prepend(imageDetail);
            //     gifDiv.prepend(gifImage);

            //     $("#displayGifs").prepend("<br>")
            //     $("#displayGifs").prepend(gifDiv);
        // }
    });
});