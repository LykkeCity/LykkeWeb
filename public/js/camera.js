if ($('.camera_stream').length) {
// References to all the element we will need.
  var video = document.querySelector('._camera_video'),
    image = document.querySelector('._camera_snap'),
    controls = document.querySelector('._camera_controls'),
    frame = document.querySelector('._camera_frame'),
    take_photo_btn = document.querySelector('._take_photo'),
    delete_photo_btn = document.querySelector('._delete_photo'),
    use_photo_btn = document.querySelector('._use_photo'),
    error_message = document.querySelector('._camera_message');
  var localStream, savePhotoSrc, saveRelatedTarget;

  navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  function takePhoto() {
    var snap = takeSnapshot();

    // Show image.
    image.setAttribute('src', snap);
    image.classList.add("visible");
    frame.classList.remove("visible");

    // Enable delete and save buttons
    controls.classList.add("visible");
    take_photo_btn.classList.remove("visible");
    video.classList.remove("visible");

    savePhotoSrc = snap;

    // Set the href attribute of the download button to the snap url.
    // Pause video playback of stream.
    video.pause();
  }

  function showVideo() {
    deletePhoto();
  }

  function takeSnapshot(){
    // Here we're using a trick that involves a hidden canvas element.

    var hidden_canvas = document.querySelector('canvas'),
      context = hidden_canvas.getContext('2d');

    var width = video.videoWidth,
      height = video.videoHeight;

    if (width && height) {

      // Setup a canvas with the same dimensions as the video.
      hidden_canvas.width = width;
      hidden_canvas.height = height;

      // Make a copy of the current frame in the video on the canvas.
      context.drawImage(video, 0, 0, width, height);

      // Turn the canvas image into a dataURL that can be used as a src for our photo.
      return hidden_canvas.toDataURL('image/png');
    }
  }

  function deletePhoto() {
    hideUI();

    frame.classList.add("visible");
    video.classList.add("visible");
    take_photo_btn.classList.add("visible");

    video.play();
  }

  function displayErrorMessage(error_msg, error){
    error = error || "";
    if(error){
      console.error(error);
    }

    error_message.innerText = error_msg;

    hideUI();
    error_message.classList.add("visible");
  }

  function hideUI(){
    controls.classList.remove("visible");
    take_photo_btn.classList.remove("visible");
    video.classList.remove("visible");
    error_message.classList.remove("visible");
    frame.classList.remove("visible");
    image.setAttribute('src', '');
    image.classList.remove("visible");
  }

  function initCamera() {
    // The getUserMedia interface is used for handling camera input.
// Some browsers need a prefix so here we're covering all the options


    if(!navigator.getMedia){
      displayErrorMessage("Your browser doesn't have support for the navigator.getUserMedia interface.");
    }
    else{

      // Request the camera.
      navigator.getMedia(
        {
          video: true
        },
        // Success Callback
        function(stream){
          localStream = stream;
          // Create an object URL for the video stream and
          // set it as src of our HTLM video element.
          video.src = window.URL.createObjectURL(stream);

          // Play the video element to start the stream.
          video.play();
          video.onplay = function() {
            showVideo();
          };
        },
        // Error Callback
        function(err){
          displayErrorMessage("There was an error with accessing the camera stream: " + err.name, err);
        }
      );
    }
  }


  take_photo_btn.addEventListener("click", function(e){
    e.preventDefault();
    takePhoto();
  });


  delete_photo_btn.addEventListener("click", function(e){
    e.preventDefault();
    deletePhoto();
  });

  $('#camera').on('show.bs.modal', function (event) {
    initCamera();

    saveRelatedTarget = event.relatedTarget;
  });

  $('#camera').on('hide.bs.modal', function (event) {
    $(saveRelatedTarget)
      .closest($('.fileupload'))
      .removeClass('fileupload--fail')
      .addClass('fileupload--uploaded')
      .attr('style', 'background-image: url('+savePhotoSrc+')');

    hideUI();

    localStream.getVideoTracks()[0].stop();
  })
}