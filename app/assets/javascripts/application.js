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
// require cable
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require jquery-ui/widget
//= require jquery-ui/widgets/sortable
//= require turbolinks
//= require popper
//= require bootstrap
//= require bootstrap-sprockets
//= require_tree .
//= require croppie
//=

let Server_Address = "172.25.61.104"; // broadcasting ipv4 remote host address
let isShuffled = false;
var counter = 0;
var x = new XMLHttpRequest();
var audio = new Audio();
var currentSong = null;
var SongUsername = null;
var songQueue = new Array();
var listening = false;


function addtoPL(song_id, playlist_id, dom_id) {
    Rails.ajax({
        url: "/add_to_playlist?song_id=" + song_id + "&playlist_id=" + playlist_id,
        type: "POST",
        processData: false,
        success: function () {
            console.log("success bitc");
            $('#SongtoPlaylist_' + (dom_id)).attr('onclick', "removeFromPL(" + song_id + "," + playlist_id + ',' + (dom_id) + ')');
            $('#SongtoPlaylist_' + (dom_id)).html("Remove From Playlist");
        },
        error: function () {
            console.log("Playlist post failed")
        }
    })
}

function removeFromPL(song_id, playlist_id, dom_id) {
    Rails.ajax({
        url: "/remove_from_playlist?song_id=" + song_id + "&playlist_id=" + playlist_id,
        type: "POST",
        processData: false,
        success: function () {
            console.log("success btich");
            $('#SongtoPlaylist_' + (dom_id)).attr('onclick', "addtoPL(" + song_id + "," + playlist_id + ',' + (dom_id) + ')');
            $('#SongtoPlaylist_' + (dom_id)).html("Add to Playlist");
        },
        error: function () {
            console.log("Playlist post failed")
        }
    })
}

function displayDropdown(id) {
    let x = document.querySelector("#option_list_" + id);
    if (x.style.visibility == "visible") {
        console.log("killing");
        x.style.visibility = "hidden";
    } else {
        x.style.visibility = "visible";
    }
    console.log("options");
}

function shuffleSongs() {
    let songReplica = songQueue.slice();
    let shuffledArray = new Array();
    console.log(songQueue);
    while (shuffledArray.length != songQueue.length) {
        let pos = Math.floor(Math.random() * songReplica.length);
        shuffledArray.push(songReplica[pos]);
        console.log(pos + " : " + songReplica.length);
        songReplica.splice(pos, 1);
        console.log("spliced: " + shuffledArray.length + " vs " + songQueue.length);
    }
    isShuffled = true;
    ReorderSongs(shuffledArray);
    console.log(songQueue);
    console.log("reloaded!")
}

function buildPlayer(song, username, title, ...args) {
    let buildSong = function () {
        audio.src = "";
        var songinfo = title;
        $('#playerCoverImage').attr("src", args[0]); //
        $('#songInfo').html(songinfo);
        if (args[1] == "") {
            $('#songGenre').html(args[2]);
        } else {
            $('#songGenre').html(args[1] + ", " + args[2]);
        }

        var artist = "<img class=\"songArtistAvatarImage\" src=\"" + args[3]/* image src*/ + "\">" + "<p style=\"display: inline;\">@" + username + "</p>";
        $('#songArtistAvatar').html(artist);
        console.log("lmapppp");
        console.log(args[3]);
        audio.src = song;
        console.log(audio);
    };
    let updateSong = function () {
        let duration = args[0];
        console.log("duration" + duration);
        audio.currentTime = duration;
        lastTime = duration;
    };
    if (args.length != 0) {
        if (args.length == 2 && args[1] == true) {
            //just updating time...
            if (isListening())
                updateSong();
            // audio.play();
        } else {
            //changing and updating song...
            // audio.pause();
            buildSong();
            if (isListening()) {
                updateSong();
                console.log("updating song time");
            } else {
                console.log("not so much")
            }
            audio.play();
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
                        type: "PATCH",
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
        type: "POST",
        processData: false,
        error: function (error) {
            console.log(error)
        }
    })
}

function get_current_playlist() {
    return Cookies.get('playlist');
}

function get_current_song() {
    return Cookies.get('current_song');
}

function increment(id) {
    Rails.ajax({
        url: "/increment?id=" + id,
        type: "PATCH",
        processData: false,
        error: function (error) {
            console.log(error)
        }
    })
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
        console.log("difference:" + difference);
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

function backSong() {
    isListening(false);
    if (counter != 1) {
        counter -= 2;
        let song = songQueue[counter];
        set_current_song(songQueue[counter]);
        console.log("getting counter " + counter);
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
                    let coverimage = data.cover;
                    let genre = data.genre;
                    let subgenre = data.subgenre;
                    let avatar = data.avatar
                    if (isBroadcasting())
                        sendData(0);
                    buildPlayer(url, username, title, coverimage, genre, subgenre, avatar);
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
        if (song_id === "-1" && !isListening()) {
            alert("Stream Not Available...");
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
                    isListening(true);
                    buildPlayer(url, username, title, duration, args[2]);
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

function requestData(callback, broadcaster, newBroadcaster) {
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
                        console.log("results[Song_id] === (-1) = " + results["Song_id"] === ("-1"));
                        //
                        //callback[1] true when updating time
                        //false when updating and getting song
                        if (parseInt(results["Song_id"]) !== parseInt(get_current_song())) {
                            console.log(typeof results["Song_id"]);
                            console.log(typeof get_current_song());
                            needsUpdate(true);
                        }
                        if ((Math.abs(lastTime - results["Duration"]) > 3 && !isListening()) || needsUpdate()) {
                            if (needsUpdate()) {
                                console.log("UPDATING.....")
                            }
                            if (newBroadcaster)
                                increment(broadcaster);

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
        };
        x.open("POST", "http://" + Server_Address + ":4446");
        let a = new FormData();
        a.append("Broadcaster_id", broadcaster);
        x.send(a);

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

function SelectedSong(song, username, title, singleSong, ...args) {
    if (singleSong) {
        console.log("SINGLE SONG");
        set_current_song(args[0]);
        buildPlayer(args[1]/*song*/, username, title, args[2], args[3], args[4], args[5]);
        isPlayList = false;
    } else {
        isShuffled = false;
        console.log("NOT SINGLE SONG");
        set_current_song(args[2]);
        let cover_url = args[3];
        //songQueue = args[0];
        ReorderSongs(args[0]);
        console.log("\n\nSong Queue" + songQueue + "\n\n");
        set_current_playlist(args[1]);
        isPlayList = true;
        counter = 0;
        nextSong();
    }
}

function sendTheAJAX(controller, ...id) {
    var x = new XMLHttpRequest;
    x.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(this.responseText, 'text/html');
            var elem = doc.getElementById(div);
            console.log(elem);
            $(".main").html(elem);
            //    $(".main").html(this);
        }
    };
    if (controller.charAt(0) == '/') {
        x.open("GET", '/' + controller.substring(1) + '/' + id[0], true);
        var url = '/' + controller.substring(1) + '/' + id[0];
        var temp = controller.split("/")
        var div = temp[1];
    } else if (controller == '') {
        x.open("GET", '/', true);
        var url = '/';
        var div = 'home';
    } else {
        x.open("GET", '/' + controller + '/' + id[0], true);
        var url = '/' + controller + '/' + id[0];
        var div = controller;
    }
    x.send();
    history.pushState(null, null, url);
}

function sendData(duration, ...args) {
    try {
        if (args.length == 0) {
            x.open("POST", "http://" + "localhost" + ":4444", true);
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
            consolde.log("sent it out");
        }
    } catch (e) {
        console.log(e);
    }
}

function setNewPlaylistSong(position) {
    counter = position;
    nextSong();
}

function set_current_song(id) {
    Cookies.set('current_song');
    Cookies.set('current_song', id, {expires: 14});
}

function set_current_playlist(id) {
    Cookies.set('playlist');
    Cookies.set('playlist', id, {expires: 14});
    console.log('playlist: ' + Cookies.get('playlist'));
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
