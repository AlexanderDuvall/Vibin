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

//= require jquery
//= require jquery-ui/widget
//= require jquery-ui/widgets/sortable
//= require turbolinks
//= require popper
//= require bootstrap
//= require bootstrap-sprockets
//= require_tree .
//=


window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        console.log("true");
        $('#myModal').css("display", "none");
    }
};
$(document).ready(function () {
    console.log($('.main'));
});

$("#G").on("click", function () {
    console.log("lolas");
});

function sendTheAJAX(controller, ...id) {
    var x = new XMLHttpRequest;
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.responseText, 'text/html');
            var elem = doc.getElementById(controller);
            console.log(elem);
            $(".container").html(elem);
            //    $(".main").html(this);
        }
    };
    x.open("GET", '/' + controller + '/' + id[0], true);
    x.send();
    var url = '/' + controller + '/' + id[0];
    history.pushState(null, null, url);
}

var counter = 0;
var x = new XMLHttpRequest();

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

function isBroadcasting(...args) {
    if (args.length == 1 && (args[0] == false || args[0] == true))
        broadcasting = args[0];
    return broadcasting;
}

function connect(user_id) {
    console.log(user_id);
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
                } else {
                    console.log("Machine NOT REACHED");
                }
            } else {
                console.log("no response");
            }
        }
    };
    x.open("POST", "http://10.0.0.67:4444", true);
    let data = new FormData();
    data.append("User_id", user_id);
    x.send(data);
}

function listenerCallback() {
    console.log("comparing....");
    let results = this;
    if (results.length != 0) {
        let difference = audio.currentTime - parseInt(results["Duration"]);
        console.log("difference:" + difference);
        if (difference <= 6) {
            //update times
            audio.currentTime = parseInt(results["Duration"]);
        } else {
            console.log("still in sync!")
        }
    } else {
        console.log("no need");
    }
}

function requestData(callback, justUpdating) {
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
                    if (results.hasOwnProperty("Song_id") && results.hasOwnProperty("Duration")) {
                        console.log("HAS SONG ID AND DURATION VARIABLE");
                        console.log(results["Song_id"] + "," + results["Duration"]);
                        //
                        //callback[1] true when updating time
                        //false when updating and getting song
                        if (Math.abs(lastTime - results["Duration"]) > 3)
                            nextSong(results["Song_id"], results["Duration"], justUpdating);
                        console.log("SENDING REQUEST DATA  TO THE CLIENT........");
                        if (typeof callback != "undefined")
                            callback.apply(results);
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
        };
        x.open("POST", "http://10.0.0.67:4446");
        let a = new FormData();
        a.append("Broadcaster_id", "2");
        x.send(a);
    } catch (e) {
        console.log(e);
    }
}


function sendData(duration, user_id) {
    try {
        x.open("POST", "http://10.0.0.67:4444", true);
        let a = new FormData();
        a.append("Duration", duration);
        a.append("Song_id", get_current_song());
        x.send(a);
        //   x.abort();
        console.log("sent it out");

    } catch (e) {
        console.log(e);
    }
}

function setNewPlaylistSong(position) {
    counter = position - 1;
    nextSong();
}

function set_current_playlist(id) {
    Cookies.set('playlist');
    Cookies.set('playlist', id, {expires: 14});
    console.log('playlist: ' + Cookies.get('playlist'));
}

function set_current_song(id) {
    Cookies.set('current_song');
    Cookies.set('current_song', id, {expires: 14});

}

function get_current_song() {
    return Cookies.get('current_song');
}

function get_current_playlist() {
    return Cookies.get('playlist');
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

var audio = new Audio();
var currentSong = null;
var SongUsername = null;
var songQueue = new Array();


function buildPlayer(song, username, title, ...args) {
    let buildSong = function () {
        audio.src = "";
        $('#usernameSong').text(username);
        $('#titleSong').text(title);
        console.log(song);
        audio.src = song;
        console.log(audio);
    };
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

        }
    } else {
        audio.pause();
        buildSong();
        lastTime = 0;
        audio.play();

    }
}


function SelectedSong(song, username, title, singleSong, ...args) {
    if (singleSong) {
        console.log("SINGLE SONG");
        set_current_song(args[0]);
        buildPlayer(args[1], username, title);
        isPlayList = false;
    } else {
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

function ReorderSongs(data) {
    console.log(data);
    console.log("^^ DATA");
    console.log("Old array: " + songQueue);
    songQueue = data;
    console.log("New array: " + songQueue);
    resetCurrentSong();
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
        //Getting Broadcaster info from user 1
        let song_id = args[0];
        let duration = args[1];
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
                buildPlayer(url, username, title, duration, args[2]);
                isListening(true);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
}

function isListening(...args) {
    if (args.length == 1 && (args[0] == false || args[0] == true))
        listening = args[0];
    return listening;
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
