let pastAudio = 1;
let isPlayList = false;
let mouseDownSeek = false;
let mouseDownVolume = false;
let isMute = false;
var broadcasting = false;
var listening = false;
let lastTime = 0;
window.addEventListener("DOMContentLoaded", function (e) {
    var username = document.querySelector("#usernameSong");
    username.innerHTML = "";
    let seekBar = document.querySelector('.seek-bar');
    let muteButton = document.querySelector(".volume");
    let muteButtonIcon = muteButton.querySelector(".ion-volume-high");
    let playButton = document.querySelector('.play');
    let playButtonIcon = playButton.querySelector('.ion-play');
    let fillBar = seekBar.querySelector('.fill');
    let skipForward = document.querySelector('.skip_forward');
    let volume = document.querySelector('.volume_bar');
    let volume_fill = volume.querySelector(".volume_fill");
    let modal = document.getElementById("myModal");
    let btn = document.getElementById("myBtn");
    let broadcast = document.getElementById("broadcast_text");
    broadcast.onclick = function () {
        let id = $("#broadcast_text").data("session");
        console.log(id + " uhuh")
        connect(id);
    };
    btn.onclick = function () {
        Rails.ajax({
            url: '/get_playlist_songs',
            type: 'GET',
            processData: false,
            success: function (data) {
                console.log(data.song_position[0]);

                modal.style.display = "block";
            },
            error: function (data) {
                console.log(data);
            }
        });

    };
// When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
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
    audio.addEventListener('play', function () {
        playButtonIcon.className = 'ion-pause';
        volume_fill.style.width = 100 + '%';
        audio.volume = 1;

    });

    audio.addEventListener('pause', function () {
        playButtonIcon.className = 'ion-play';
    });

    audio.addEventListener('timeupdate', function () {
        if (mouseDownSeek) return;
        let currentTime = audio.currentTime;
        let p = currentTime / audio.duration;
        fillBar.style.width = p * 100 + '%';
        if (isBroadcasting() && currentTime > (lastTime + 2)) {
            lastTime = currentTime;
            console.log(currentTime);
            sendData(currentTime)
            console.log("broadcasting update...")
        } else if (isListening() && (currentTime - lastTime) > 3) {
            console.log(typeof (currentTime - lastTime));
            console.log(currentTime - lastTime > 3);
            console.log("TIME UPDATE: " + currentTime + " vs " + lastTime);
            lastTime = currentTime;
            requestData(listenerCallback(), true);
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
        volume_fill.style.width = p * 100 + '%';
        audio.volume = p;
        pastAudio = audio.volume;
        //changing volume
    });


    seekBar.addEventListener('mousedown', function (e) {
        mouseDownSeek = true;
        let p = getP(e);
        fillBar.style.width = p * 100 + '%';
    });

    window.addEventListener('mousemove', function (e) {
        if (mouseDownVolume) {
            let p = getP(e);
            volume_fill.style.width = p * 100 + '%';
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
            fillBar.style.width = p * 100 + '%';
            audio.currentTime = p * audio.duration;
        } else if (mouseDownVolume) {
            mouseDownVolume = false;
            let p = getP(e);
            volume_fill.style.width = p * 100 + '%';
            audio.volume = p;
            pastAudio = audio.volume;

            // audio.currentTime = p * audio.duration;
        }

        console.log("------------Mouse Up -------------");
    });

});

function playPause() {
    console.log("play button clicked");
    if (audio.paused) {
        audio.play();
        console.log("play");
    } else {
        audio.pause();
    }
}
