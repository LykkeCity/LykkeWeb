var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    //videoId : 'h5T2gRGcMso' - home,
    //videoId : 'Le3b6km81uc' - corp,
    videoId : $('#player').data('video-id'),
    height: '390',
    width: '640',
    events: {
      'onReady': onPlayerReady,
    }
  });

}

function onPlayerReady(event) {
  var playButton = document.getElementById("btn_video");
  playButton.addEventListener("click", function() {
    player.playVideo();
    $('.landing--video').addClass('video_played');
  });
}