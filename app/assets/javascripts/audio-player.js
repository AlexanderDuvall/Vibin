let isPlayList = false;
let mouseDownSeek = false;
let mouseDownVolume = false;
let isMute = false;
var broadcasting = false;
let lastTime = 0;
var playButton = null;
var update = false;
var currentBroadcaster = null;
let shuffle = null;
let backward = null;
let skipForward = null;
let repeat = false;
window.addEventListener("DOMContentLoaded", function (e) {
    console.log("I loaded correctly n_n")
    let pastAudio = 1;
    let seekBar = document.querySelector('.seek-bar');
    let muteButton = document.querySelector(".volume");
    let muteButtonIcon = muteButton.querySelector(".ion-volume-high");
    console.log("I loaded correctly n_n")
    playButton = document.querySelector('#music_bar_play_button');
    let playButtonIcon = playButton.querySelector(".ion-play");
    let fillBar = seekBar.querySelector('.fill');
    skipForward = document.querySelector('.skip_forward');
    shuffle = document.querySelector('.shuffle');
    backward = document.querySelector(".back");
    let volume = document.querySelector('.volume_bar');
    let volume_fill = volume.querySelector(".volume_fill");
    let modal = document.getElementById("audio-modal");
    let addPlaylistModal = document.getElementById("add-playlist-modal");
    let renderPlaylist = document.getElementById("renderPlaylist");
    let renderAddPlaylist = document.getElementById("renderAddPlaylist");
    let broadcast = document.getElementById("broadcast_text");
    let optionslistbutton = document.querySelector(".options_list");
    let repeatButton = document.querySelector(".repeat");
    let likeButton = document.querySelector("#like_button");
    $('.exploreTopStreamerBox').hover(function () {
        $("#Top_Streamer").css("filter", "blur(2px)");
    }, function () {
        $("#Top_Streamer").css("filter", "blur(0px)");
    });
    repeatButton.onclick = function () {
        if (repeat) {
            repeat = false;
        } else {
            repeat = true
        }
    };
    broadcast.onclick = function () {
        let id = $("#broadcast_text").data("session");
        let key = $("#broadcast_text").data("key");
        console.log(id + " uhuh");
        connect(id, key);
    };
    skipForward.addEventListener('click', function () {
        if (isPlayList) {
            nextSong();
        }
    });
    renderAddPlaylist.onclick = function () {

        let song = get_current_song();
        //loadPlaylistSongs();
        if (isPlayList) {
            if (isShuffled) {
                $('.modal-content-add-playlist').load("/exists_in_playlist?song_id=" + song + "&shuffle=true&data=" + songQueue + "&playlist=" + get_current_playlist());
                console.log("shuffled showing");
            } else {
                $('.modal-content-add-playlist').load("/exists_in_playlist?song_id=" + song + "&shuffle=false&data=" + songQueue + "&playlist=" + get_current_playlist());
                console.log("not shuffled showing");
            }
        } else {
            $('.modal-content-add-playlist').load("/exists_in_playlist?song_id=" + song + "&shuffle=0&playlist=0&currentPlaylist=0");
            console.log("no playlist");
        }

        addPlaylistModal.style.display = "block";

    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            console.log("ffacs");
        } else if (event.target == addPlaylistModal) {
            addPlaylistModal.style.display = "none";
            console.log("sayo");
        }
    };

    backward.addEventListener('click', function () {
        if (audio.currentTime < 5 && isPlayList) {
            backSong();
        } else {
            audio.currentTime = 0;
        }
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
    audio.addEventListener("ended", function () {
        if (repeat) {
            audio.play();
            console.log("repeating");
        } else if (isListening()) {
            needsUpdate(true);
            setTimeout(requestData(null, currentBroadcaster, false), 1300);
            //needsUpdate(false)
        } else {
            nextSong();
        }
    });
    audio.addEventListener('timeupdate', function () {
        if (mouseDownSeek) return;
        let currentTime = audio.currentTime;
        let p = currentTime / audio.duration;
        fillBar.style.width = p * 100 + '%';
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

            requestData(
                function (results) {
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
            p = (e.clientX - seekBar.getBoundingClientRect().left) / seekBar.clientWidth;
            p = clamp(0, p, 1);
        } else {
            p = (e.clientX - volume.getBoundingClientRect().left) / volume.clientWidth;
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
            let p = getP(e);
            fillBar.style.width = p * 100 + '%';
            audio.currentTime = p * audio.duration;
            mouseDownSeek = false;
        } else if (mouseDownVolume) {
            mouseDownVolume = false;
            let p = getP(e);
            volume_fill.style.width = p * 100 + '%';
            audio.volume = p;
            pastAudio = audio.volume;
            // audio.currentTime = p * audio.duration;
        }
        /*
                if(window.location.href == "http://localhost:3000/groupies"){
                    console.log("groupies page");
                }else if(window.location.href == "http://localhost:3000/"){
                    console.log("home page");
                }
                console.log(window.location.href);
                console.log("------------Mouse Up -------------");*/
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
        if (isBroadcasting())
            sendData(null, "Pause");
        audio.pause();
    }
}