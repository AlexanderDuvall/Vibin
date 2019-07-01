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
                } else if (results.hasOwnProperty("Song_id") && results.hasOwnProperty("Duration")) {
                    console.log("HAS SONG ID AND DURATION VARIABLE")
                    console.log(results["Song_id"] + "," + results["Duration"]);
                    nextSong(results["Song_id"], results["Duration"]);
                } else {
                    console.log("Machine NOT REACHED");
                }
            } else {
                console.log("no response");
            }
        }
    };
    x.open("POST", "http://192.168.1.91:4444", true);
    let data = new FormData();
    data.append("User_id", user_id);
    x.send(data);
}

function requestData() {
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
                    if (results.hasOwnProperty("Machine-Reached-Status") && results['Machine-Reached-Status'] == "True") {
                        console.log("MACHINE REACHED");
                        isBroadcasting(true);
                    } else if (results.hasOwnProperty("Song_id") && results.hasOwnProperty("Duration")) {
                        console.log("HAS SONG ID AND DURATION VARIABLE");
                        console.log(results["Song_id"] + "," + results["Duration"]);
                        nextSong(results["Song_id"], results["Duration"]);
                    } else {
                        console.log("Machine NOT REACHED");
                    }
                } else {
                    console.log("no response");
                }
            }
        };
        x.open("POST", "http://192.168.1.91:4446");
        let a = new FormData();
        a.append("Broadcaster_id", "1");
        x.send(a);
    } catch (e) {
        console.log(e);
    }
}

function sendData(duration, user_id) {
    try {
        x.open("POST", "http://192.168.1.91:4444", true);
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
    /// console.log('playlist: ' + Cookies.get('playlist'));
}

function set_current_song(id) {
    Cookies.set('current_song');
    Cookies.set('current_song', id, {expires: 14});

}

function get_current_playlist() {
    return Cookies.get('playlist');
}

function get_current_song() {
    return Cookies.get('current_song');
}

function previewImage(id) {

    var preview = document.querySelector('#preview');
    var file = document.querySelector(id).files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

var audio = new Audio();
var currentSong = null;
var SongUsername = null;
var songQueue = new Array();


function buildPlayer(song, username, title, ...args) {
    audio.src = "";
    $('#usernameSong').text(username);
    $('#titleSong').text(title);
    console.log(song);
    audio.src = song;
    if (args.length != 0) {
        let duration = args[0];
        audio.currentTime = duration;
    }
    audio.play();
    console.log(audio);
    lastTime = 0;
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

function ReorderSongs(songarray) {
    console.log(songarray);
    console.log(Date.now());
    console.log("Old array: " + songQueue);
    songQueue = songarray;
    console.log("New array: " + songQueue);
    Rails.ajax({
        url: "",
        type: "GET",
        processData: false,
        success: function () {

        }
    })
}


function nextSong(...args) {
    if (args.length != 0) {
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
            console.log("end of list");
            set_current_song(-1)
        }
    } else {
        //Getting Broadcaster info from user 1
        let songId = args[0];
        let duration = args[1];
        Rails.ajax({
            url: "/getsongs?id=" + songId,
            type: "GET",
            processData: false,
            success: function (data, textStatus, xhr) {
                console.log("success");
                console.log(data);
                let url = data.song_url;
                let title = data.title;
                let username = data.username;
                buildPlayer(url, username, title, duration);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
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
