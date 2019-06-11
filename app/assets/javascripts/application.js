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
    audio.src = song.alt
    audio.play();
    console.log(audio);
}

function SelectedSong(song, username, title, singleSong, ...args) {

    if (singleSong) {
        buildPlayer(song, username, title);
    } else {
        songQueue = args[0];
        console.log(args[1]);
        Rails.ajax({
            url: ":id/getsongs",
            type: "GET",
            processData: false,
            data: {id: parseInt(songQueue[0])},
            success: function (data) {
                console.log(data);
            },
            error: function (data) {
                console.log(data);
            }
        });
    }
}

function nextSong() {
    songQueue.shift();
    // might not work. may need to make rails function. if the case preload songs. up to so many.
}


function getCurrentSong() {
    return currentSong;
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
