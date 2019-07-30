// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require active_storage_drag_and_drop
//= require rails-ujs
//= require activestorage
//= require cable
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require jquery-ui/widget
//= require jquery-ui/widgets/sortable
//= require jquery.minicolors
//= require jquery.minicolors.simple_form
//= require turbolinks
//= require popper
//= require bootstrap
//= require bootstrap-sprockets
//= require_tree .

var audio = new Audio();
var counter = 0;
var currentSong = null;
let Server_Address = "192.168.1.70";
var SongUsername = null;
var songQueue = new Array();
var x = new XMLHttpRequest();

$(function(){
  $('.userTabDiv').mouseover(function(){
    $('.dropdown-content').css('display', 'block');
  });
});

function buildPlayer(song, name, username, title, ...args) {
    let buildSong = function () {
        audio.src = "";

        $('#SongArtistName').text(name);
        $('#songArtistUsername').text('@' + username);
        $('#songTitle').text(title);
        //$('#songSubGenre').text();
        console.log(song);
        audio.src = song;
        console.log(audio);
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
    let updateSong = function () {
        let duration = args[0];
        audio.currentTime = duration;
        lastTime = duration;
    };
    if (args.length != 0) {
        if (args.length == 2 && args[1] == true) {
            //just updating time...
            updateSong();
            // audio.play();
        } else {
            //changing and updating song...
            // audio.pause();
            buildSong();
            updateSong();
            audio.play();
            initProgressBar();
        }
    } else {
        audio.pause();
        buildSong();
        lastTime = 0;
        audio.play();

    }
}

function connect(user_id) {
    console.log(user_id);
    x.keepalive = true;
    x.onreadystatechange = function () {
        if (x.readyState === 1) {
            console.log("CONNECTION OPENED");

        }
        if (x.readyState === 2) {
            console.log("DATA HAS BEEN SENT");
        }
        if (x.readyState === 3) {
            console.log("LOADING");
        }
        if (x.readyState === 4) {
            console.log("DONE...");
            let results = x.response;
            console.log(x.response);
            if (results.length > 0) {
                let lines = results.split("\n");
                results = {};
                for (let i = 0; i < lines.length; i++) {
                    var content = lines[i].split(/:(.+)/);
                    if (content.length == 3)
                        content.pop();
                    console.log(content);
                    console.log(content.length);
                    if (content.length == 2) {
                        console.log("hashing");
                        results[content[0]] = content[1];
                    }
                }
                console.log(results);
                if (results.hasOwnProperty("Machine-Reached-Status") && results['Machine-Reached-Status'] == "True") {
                    console.log("MACHINE REACHED");
                    isBroadcasting(true);
                    Rails.ajax({
                        type: "Patch",
                        url: "broadcasters/" + user_id + "?is_playing=" + true,
                        processData: false,
                        success: function (data, textStatus, xhr) {
                            console.log(data)
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    })
                } else {
                    console.log("Machine NOT REACHED");
                }
            } else {
                console.log("no response");
            }
        }
    };
    x.open("POST", "http://localhost:4444", true);
    let data = new FormData();
    data.append("User_id", user_id);
    x.send(data);
}

function decrement(id) {
    Rails.ajax({
        url: "/decrement?id=" + id,
        processData: false,
        type: "Patch",
        success: function (e) {

        }
    });
}

function get_current_song() {
    return Cookies.get('current_song');
}

function get_current_playlist() {
    return Cookies.get('playlist');
}



function isBroadcasting(...args) {
    if (args.length == 1 && (args[0] == false || args[0] == true))
        broadcasting = args[0];
    return broadcasting;
}

function isListening(...args) {
    if (args.length == 1 && (args[0] == false || args[0] == true))
        listening = args[0];
    return listening;
}

function listenerCallback(results) {
    console.log("comparing....\n RESULTS: ");
    console.log(results.length);
    if (results["Song_id"] === ("-1") && isListening()) {
        playButton.click();
        alert("Station Stopped..");
        isListening(false);
    } else if (results.length != 0) {
        let difference = audio.currentTime - parseInt(results["Duration"]);
        if (Math.abs(difference) >= 4) {
            //update times
            audio.currentTime = parseInt(results["Duration"]);
        } else {
            console.log("still in sync!")
        }
    } else {
        console.log("no need");
    }
}

function needsUpdate(...args) {
    if (args.length == 1 && (args[0] == false || args[0] == true))
        update = args[0];
    return update;
}

function nextSong(...args) {
    if (args.length == 0) {
        isListening(false);
        if (counter != songQueue.length) {
            let song = songQueue[counter];
            set_current_song(songQueue[counter]);
            console.log("getting next song:" + song);
            Rails.ajax({
                url: "/getsongs?id=" + song,
                type: "GET",
                processData: false,
                success: function (data, textStatus, xhr) {
                    console.log("success");
                    console.log(data);
                    let url = data.song_url;
                    let title = data.title;
                    let username = data.username;
                    if (isBroadcasting())
                        sendData(0);
                    buildPlayer(url, username, title);
                },
                error: function (data) {
                    console.log(data);
                }
            });
            counter++;
        } else {
            console.log("end of list...");
            set_current_song(-1)
        }
    } else {

        let song_id = args[0];
        let duration = args[1];
        if (song_id === "-1" && !isListening()) {
            alert("Stream Not Available...");
            isListening(false)
        } else if (song_id === "-1" && isListening()) {
            alert("Stream stopped...");
            isListening(false);
        } else
            Rails.ajax({
                url: "/getsongs?id=" + song_id,
                type: "GET",
                processData: false,
                success: function (data, textStatus, xhr) {
                    console.log("success");
                    console.log(data);
                    let url = data.song_url;
                    let title = data.title;
                    let username = data.username;
                    set_current_song(song_id);
                    buildPlayer(url, username, title, duration, args[2]);
                    isListening(true);
                },
                error: function (data) {
                    console.log(data);
                }
            });
    }
}

function previewFile() {

    var preview = document.querySelector('#preview');
    var file = document.querySelector('#avatar').files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function previewImage(id) {

    var preview = document.querySelector('#preview');
    var file = document.querySelector(id).files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        console.log("loaded");
        preview.src = reader.result;
    }, false);
    if (file) {
        console.log("file exist");
        reader.readAsDataURL(file);
    }
}

function readUrl(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#Album_Cover').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function ReorderSongs(data) {
    console.log(data);
    console.log("^^ DATA");
    console.log("Old array: " + songQueue);
    songQueue = data;
    console.log("New array: " + songQueue);
    resetCurrentSong();
}

function repost(postid) {
    console.log("reposting...");
    Rails.ajax({
        url: "/repost?post_id=" + postid,
        type: "POST",
        processData: false,
        success: function (data, textStatus, xhr) {
            console.log(data);
        },
        error: function (data) {
            console.log(data);
        }
    });
}

function requestData(callback, broadcaster, newBroadcast) {
    console.log("loading....");
    try {
        x.onreadystatechange = function () {
            if (x.readyState === 1) {
                console.log("CONNECTION OPENED");
            }
            if (x.readyState === 2) {
                console.log("DATA HAS BEEN SENT");
            }
            if (x.readyState === 3) {
                console.log("LOADING");
            }
            if (x.readyState === 4) {
                console.log("DONE...");
                let results = x.response;
                console.log(x.response);
                if (results.length > 0) {
                    let lines = results.split("\n");
                    results = {};
                    for (let i = 0; i < lines.length; i++) {
                        var content = lines[i].split(/:(.+)/);
                        if (content.length == 3)
                            content.pop();
                        console.log(content);
                        console.log(content.length);
                        if (content.length == 2) {
                            console.log("hashing");
                            results[content[0]] = content[1];
                        }
                    }
                    console.log(results);
                    //SUCCESS
                    if (results.hasOwnProperty("Song_id") && results.hasOwnProperty("Duration")) {
                        console.log("HAS SONG ID AND DURATION VARIABLE");
                        //callback[1] true when updating time
                        //false when updating and getting song
                        if (newBroadcast) {
                            Rails.ajax({
                                url: "/increment?id=" + currentBroadcaster,
                                type: "PATCH",
                                processData: false
                            });
                            if (parseInt(results["Song_id"]) !== parseInt(get_current_song())) {
                                console.log(typeof results["Song_id"]);
                                console.log(typeof get_current_song());
                                needsUpdate(true);
                            }
                            if (/**(Math.abs(lastTime - results["Duration"]) > 3 && !isListening()) ||**/ needsUpdate()) {
                                if (needsUpdate()) {
                                    console.log("UPDATING.....")
                                }
                                nextSong(results["Song_id"], results["Duration"]);
                                console.log("SENDING REQUEST DATA  TO THE CLIENT........");

                                needsUpdate(false);
                            }

                            if ((typeof callback != "undefined" ^ callback != null) && isListening()) {
                                console.log("callback... running");
                                callback(results);
                            }
                        } else {
                            console.log("Machine NOT REACHED");
                            //callback[0].apply();
                        }
                    } else {
                        // callback.apply();
                        console.log("no response");
                    }
                    //x.close();
                }
            }
            x.open("POST", "http://" + Server_Address + ":4446");
            let a = new FormData();
            a.append("Broadcaster_id", broadcaster);
            x.send(a);

        };
    } catch (e) {
        console.log(e);
    }
}

function resetCurrentSong() {
    let song = get_current_song();
    let index = -1;
    for (let i = 0; x < songQueue.length; i++) {
        if (songQueue[i] == song) {
            counter = i;
            break;
        }
    }
}

function SelectedSong(song, name, username, title, singleSong, ...args) {
    if (singleSong) {
        console.log("SINGLE SONG");
        set_current_song(args[0]);
        buildPlayer(args[1], name, username, title);
        isPlayList = false;
        if (isListening())
            isListening(false);
        } else {
          if (isListening())
            isListening(false);
        console.log("NOT SINGLE SONG");
        set_current_song(args[2]);
        songQueue = args[0];
        console.log("\n\nSong Queue" + songQueue + "\n\n");
        set_current_playlist(args[1]);
        isPlayList = true;
        counter = 0;
        nextSong();
    }
}

function sendData(duration, ...args) {
    try {
        if (args.length == 0) {
            x.open("POST", "http://localhost:4444", true);
            let a = new FormData();
            a.append("Duration", duration);
            a.append("Song_id", get_current_song());
            x.send(a);
            //   x.abort();
            console.log("sent it out");
        } else {
            x.open("POST", "http://" + "localhost" + ":4444", true);
            let a = new FormData();
            a.append("Action", args[0]);
            x.send(a);
            console.log("sent it out");
        }
    } catch (e) {
        console.log(e);
    }
}

function sendTheAJAX(controller, ...id) {
    var x = new XMLHttpRequest;
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.responseText, 'text/html');
            var elem = doc.getElementById(controller);
            console.log(elem);
            $(".main").html(elem);
            //    $(".main").html(this);
        }
    };
    if (controller == 'home') {
        x.open("GET", '/', true);
        console.log("home");
        var url = "/";
    } else {
        x.open("GET", '/' + controller + '/' + id[0], true);
        console.log("controller not home");
        var url = '/' + controller + '/' + id[0];
        console.log(url);
    }
    x.send();
    history.pushState(null, null, url);
}


function set_current_playlist(id) {
    Cookies.set('playlist');
    Cookies.set('playlist', id, {expires: 14});
}

function set_current_song(id) {
    Cookies.set('current_song');
    Cookies.set('current_song', id, {expires: 14});
}

function setNewPlaylistSong(position) {
    counter = position - 1;
    nextSong();
}

function validateFiles(inputFile) {
    var maxExceededMessage = "This file exceeds the maximum allowed file size (5 MB)";
    var extErrorMessage = "Only image file with extension: .jpg, .jpeg, .gif or .png is allowed";
    var allowedExtension = ["mp3", "mp4"];

    var extName;
    var maxFileSize = $(inputFile).data('max-file-size');
    var sizeExceeded = false;
    var extError = false;

    $.each(inputFile.files, function () {
        if (this.size && maxFileSize && this.size > parseInt(maxFileSize)) {
            sizeExceeded = true;
        }
        extName = this.name.split('.').pop();
        if ($.inArray(extName, allowedExtension) == -1) {
            extError = true;
        }
    });
    if (sizeExceeded) {
        window.alert(maxExceededMessage);
        $(inputFile).val('');
    }
    if (extError) {
        window.alert(extErrorMessage);
        $(inputFile).val('');
    }
}

window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        $('#myModal').css("display", "none");
    }
};
