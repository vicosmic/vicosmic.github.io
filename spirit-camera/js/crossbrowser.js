(function() {

  var width = 787;    // We will scale the photo width to this
  var height = 561;     // This will be computed based on the input stream
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    // For website to access webcam.

    function success(stream) {
        // Set the source of the video element with the stream from the camera
        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
        } else {
            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
        }
        video.play();
    };

    function error(error) {
        console.error('An error occurred: [CODE ' + error.code + ']');
        // Display a friendly "sorry" message to the user
    };

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    // Call the getUserMedia method with our callback functions
    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, success, error);
    } else {
        console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
        alert("Browser does not support this webpage. Open in Mozilla Firefox.");
    };

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);

        if (isNaN(height)) {
          height = width / (4/3);
        }

        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      var hidden = document.getElementById("hidden");
      hidden.id = "";
      var display = document.getElementById("display");
      display.id = "hidden";
      takepicture();
      ev.preventDefault();
    }, false);

    clearphoto();
  }

  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#eeeeee";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  var index = 0;
  var filters = ["photoOne"];
  function changeFilter(e) {
    var element = e.target;
    element.className = "";
    var effect = filters[index++ % filters.length]; // Loops through filters
    if(effect) {
      element.classList.add(effect);
    }
  }

  function takepicture() {
    var context = canvas.getContext('2d');
    // document.querySelector("photo").addEventListener("onfocus", changeFilter, false);
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);

      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    } else {
      clearphoto();
    }
  }
  window.addEventListener('load', startup, false);
})();
