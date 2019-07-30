let pastAudio = 1;
let isPlayList = false;
let mouseDownSeek = false;
let mouseDownVolume = false;
let isMute = false;
var broadcasting = false;
var listening = false;
let lastTime = 0;
var playButton = null;
var update = false;
var currentBroadcaster = null;
var dur=  $('#dur');

window.addEventListener("DOMContentLoaded", function (e) {
  playButton = $(".play");
  let playButtonIcon = $('.ion-play');
  let volume_fill = volume.querySelector(".volume_fill");

  audio.addEventListener('play', function () {

    playButtonIcon.className = 'ion-pause';
    volume_fill.style.width = pastAudio * 100 + '%';
    audio.volume = pastAudio;
    console.log("song playing");
  });

  audio.addEventListener('pause', function () {
    playButtonIcon.className = 'ion-play';
    console.log("song paused");
  });
  function SetVolume(val)
   {
       console.log('Before: ' + audio.volume);
       audio.volume = val / 100;
       console.log('After: ' + audio.volume);
   };
   /*
  function initProgressBar() {
    var length = audio.duration;
    var current_time = audio.currentTime;

    // calculate total length of value
    var totalLength = calculateTotalValue(length)
    //jQuery(".end-time").html(totalLength);

    // calculate current value time
    var currentTime = calculateCurrentValue(current_time);
    //jQuery(".start-time").html(currentTime);

    var progressbar = document.getElementById('seekObj');
    progressbar.value = (audio.currentTime / audio.duration);
    progressbar.addEventListener("click", seek);

    if (audio.currentTime == audio.duration) {
    //  $('#play-btn').removeClass('pause');
    }

    function seek(evt) {
      var percent = evt.offsetX / this.offsetWidth;
      audio.currentTime = percent * audio.duration;
      progressbar.value = percent / 100;
    }
  };
  function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
      seconds_int = length - minutes * 60,
      seconds_str = seconds_int.toString(),
      seconds = seconds_str.substr(0, 2),
      time = minutes + ':' + seconds

    return time;
  }

  function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
      current_minute = parseInt(currentTime / 60) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
  }
  */
  audio.addEventListener('timeupdate', function () {
      if (mouseDownSeek) return;
      let currentTime = audio.currentTime;
      let p = currentTime / audio.duration;
      fillBar.style.width = p * 80 + '%';
      if (isBroadcasting() && currentTime > (lastTime + 2)) {
          lastTime = currentTime;
          console.log(currentTime);
          sendData(currentTime);
          console.log("broadcasting update...")
      } else if (isListening() && (currentTime - lastTime) > 3) {
          console.log(typeof (currentTime - lastTime));
          console.log(currentTime - lastTime > 3);
          console.log("TIME UPDATE: " + currentTime + " vs " + lastTime);
          lastTime = currentTime;

          requestData(function (results) {
              listenerCallback(results);
          }, currentBroadcaster);
      }
  });

  function clamp(min, val, max) {
      return Math.min(Math.max(min, val), max);
  }

  function getP(e) {
      let p;
      if (mouseDownSeek) {
          p = (e.clientX - seekBar.offsetLeft) / seekBar.clientWidth;
          p = clamp(0, p, 1);
      } else {
          p = (e.clientX - volume.offsetLeft) / volume.clientWidth;
          p = clamp(0, p, 1);
      }
      return p;
  }


  seekBar.addEventListener('mousedown', function (e) {
      mouseDownSeek = true;
      let p = getP(e);
      fillBar.style.width = p * 80 + '%';
  });

  window.addEventListener('mousemove', function (e) {
      if (mouseDownVolume) {
          let p = getP(e);
          volume_fill.style.width = p * 50 + '%';
          audio.volume = p;
          pastAudio = audio.volume;

      } else if (mouseDownSeek) {
          let p = getP(e);
          fillBar.style.width = p * 100 + '%';
      }

  });

  window.addEventListener('mouseup', function (e) {
      if (mouseDownSeek) {
          mouseDownSeek = false;
          let p = getP(e);
          fillBar.style.width = p * 80 + '%';
          audio.currentTime = p * audio.duration;
      } else if (mouseDownVolume) {
          mouseDownVolume = false;
          let p = getP(e);
          volume_fill.style.width = p * 50 + '%';
          audio.volume = p;
          pastAudio = audio.volume;
          // audio.currentTime = p * audio.duration;
      }

      console.log("------------Mouse Up -------------");
  });
});

function incrementPlays(id, artist_id) {
  console.log(id + "in incrementPlays");
  console.log(artist_id);
  // ajax request
  $.ajax({
      url: "/playCounter",
      type: "GET",
      data: {
          id: id,
          artist_id: artist_id
      },
      dataType: "script",
  });
}

function playPause() {
  console.log("play button clicked");
  if (audio.paused) {
      audio.play();
  } else {
      sendData(null, "Pause");
      audio.pause();
  }
}

function mSet(){
  audio.currentTime = dur.value;
  console.log('mset');
}
/*

window.addEventListener("DOMContentLoaded", function (e) {
    let seekBar = document.querySelector('.seek-bar');
    playButton = document.querySelector('.play');
    let playButtonIcon = playButton.querySelector('.ion-play');
    let fillBar = seekBar.querySelector('.fill');
    //let muteButton = document.querySelector(".volume");
    //let muteButtonIcon = muteButton.querySelector(".ion-volume-high");
    //let skipForward = document.querySelector('.skip_forward');
    let volume = document.querySelector('.volume_bar');
    let volume_fill = volume.querySelector(".volume_fill");
    let modal = document.getElementById("audio-modal");
    audio.addEventListener('play', function () {
        playButtonIcon.className = 'ion-pause';
        volume_fill.style.width = pastAudio * 100 + '%';
        audio.volume = pastAudio;
        console.log("song playing");
    });

    audio.addEventListener('pause', function () {
        playButtonIcon.className = 'ion-play';
        console.log("song paused");
    });
    //let btn = document.getElementById("renderPlaylist");
    //let broadcast = document.getElementById("broadcast_text");
    /*
      broadcast.onclick = function () {
          let id = $("#broadcast_text").data("session");
          console.log(id + " uhuh");
          connect(id);
      };
      btn.onclick = function () {
          Rails.ajax({
              url: '/get_playlist_songs',
              type: 'GET',
              processData: false,
              success: function (data) {
                  console.log("......");
                  console.log(data.id);
                  modal.style.display = "block";
              },
              error: function (data) {
                  console.log(data);
              }
          });

      };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    /*
    skipForward.addEventListener('click', function () {
        //skip to next playlist song
        nextSong();
    });
    muteButton.addEventListener('click', function () {
        if (isMute) {
            audio.volume = pastAudio;
            muteButtonIcon.className = "ion-volume-high";
            isMute = false;
            volume_fill.style.width = pastAudio * 100 + '%'
        } else {
            audio.volume = 0;
            muteButtonIcon.className = "ion-volume-mute";
            volume_fill.style.width = 0 + '%';
            isMute = true;
        }
    });

    audio.addEventListener('error', function (e) {
        console.log(e);
    });


    audio.addEventListener("ended", function () {
        if (isListening()) {
            needsUpdate(true);
            setTimeout(requestData(null, currentBroadcaster), 1300);
            //needsUpdate(false)
        } else {
            nextSong();
        }
    });
    audio.addEventListener('timeupdate', function () {
        if (mouseDownSeek) return;
        let currentTime = audio.currentTime;
        let p = currentTime / audio.duration;
        fillBar.style.width = p * 80 + '%';
        if (isBroadcasting() && currentTime > (lastTime + 2)) {
            lastTime = currentTime;
            console.log(currentTime);
            sendData(currentTime);
            console.log("broadcasting update...")
        } else if (isListening() && (currentTime - lastTime) > 3) {
            console.log(typeof (currentTime - lastTime));
            console.log(currentTime - lastTime > 3);
            console.log("TIME UPDATE: " + currentTime + " vs " + lastTime);
            lastTime = currentTime;

            requestData(function (results) {
                listenerCallback(results);
            }, currentBroadcaster);
        }
    });

    function clamp(min, val, max) {
        return Math.min(Math.max(min, val), max);
    }

    function getP(e) {
        let p;
        if (mouseDownSeek) {
            p = (e.clientX - seekBar.offsetLeft) / seekBar.clientWidth;
            p = clamp(0, p, 1);
        } else {
            p = (e.clientX - volume.offsetLeft) / volume.clientWidth;
            p = clamp(0, p, 1);
        }
        return p;
    }


    volume.addEventListener('mousedown', function (e) {
        mouseDownVolume = true;
        let p = getP(e);
        volume_fill.style.width = p * 50 + '%';
        audio.volume = p;
        pastAudio = audio.volume;
        //changing volume
    });

    seekBar.addEventListener('mousedown', function (e) {
        mouseDownSeek = true;
        let p = getP(e);
        fillBar.style.width = p * 80 + '%';
    });

    window.addEventListener('mousemove', function (e) {
        if (mouseDownVolume) {
            let p = getP(e);
            volume_fill.style.width = p * 50 + '%';
            audio.volume = p;
            pastAudio = audio.volume;

        } else if (mouseDownSeek) {
            let p = getP(e);
            fillBar.style.width = p * 100 + '%';
        }

    });

    window.addEventListener('mouseup', function (e) {
        if (mouseDownSeek) {
            mouseDownSeek = false;
            let p = getP(e);
            fillBar.style.width = p * 80 + '%';
            audio.currentTime = p * audio.duration;
        } else if (mouseDownVolume) {
            mouseDownVolume = false;
            let p = getP(e);
            volume_fill.style.width = p * 50 + '%';
            audio.volume = p;
            pastAudio = audio.volume;
            // audio.currentTime = p * audio.duration;
        }

        console.log("------------Mouse Up -------------");
    });
});
*/
