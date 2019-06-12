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
//= require turbolinks
//= require jquery
//= require jquery-ui/widget
//= require jquery-ui/widgets/sortable
//= require popper
//= require bootstrap-sprockets
//= require_tree .
//=

var counter = 0;

function setNewPlaylistSong(position) {
    counter = position - 1;
    nextSong();
}

function set_current_playlist(id) {
    Cookies.set('playlist');
    Cookies.set('playlist', id, {expires: 14});
    console.log('playlist: ' + Cookies.get('playlist'));
}

function get_current_playlist() {
    return Cookies.get('playlist');
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


function buildPlayer(song, username, title) {
    audio.src = "";
    $('#usernameSong').text(username);
    $('#titleSong').text(title);
    console.log(song);
    audio.src = song;
    audio.play();
    console.log(audio);
}

function SelectedSong(song, username, title, singleSong, ...args) {

    if (singleSong) {
        buildPlayer(song.alt, username, title);
        isPlayList = false;
    } else {
        songQueue = args[0];
        set_current_playlist(args[1]);
        isPlayList = true;
        counter = 0;
        nextSong();
    }
}
function ReorderSongs(songarray){
    console.log("Old array: " + songQueue);
    songQueue = songarray;
    console.log("New array: "+ songarray)
}


function nextSong() {
    if (counter != songQueue.length) {
        let song = songQueue[counter];
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
    } else{
        console.log("end of list");
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
