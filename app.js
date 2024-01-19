// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraOpen = document.querySelector("#camera--open")
// Access the device camera and stream to cameraView
// function cameraStart() {
//     navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then(function(stream) {
//         track = stream.getTracks()[0];
//         cameraView.srcObject = stream;
//     })
//     .catch(function(error) {
//         console.error("Oops. Something is broken.", error);
//     });
// }
function cameraStart() {
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      track = stream.getTracks()[0];

      // Create an ImageCapture object from the track
      const imageCapture = new ImageCapture(track);

      // Rotate the image captured by 180 degrees (if necessary)
      const imageCaptureSettings = { rotation: 180 };
      track.applyConstraints({ advanced: [imageCaptureSettings] });

      // Set the stream as the source for the cameraView
      cameraView.srcObject = stream;
    })
    .catch(function (error) {
      console.error("Oops. Something is broken.", error);
    });
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};
// Start the video stream when the window loads

cameraOpen.onclick = function(){
    cameraStart();
}

