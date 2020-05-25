var imagesProperties = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var passwordEntry = [false, false];
var passwords = false;
var initialStartForPassword = true;
var Submittable = false; //name, userna, email, passw, compa, birth, gende, homet, resid, terms
var SumbittableVaiables = [false, false, false, false, false, false, false, false, false, false];
var SubmittableCount = 0; //need to be 9, for for input

function openModal(image){
  $("#myModal").modal('show');
}

function focusName(obj){
    if (obj.style.backgroundColor == "white") {
        console.log('Invalid Name');
        obj.style.backgroundColor = '#FF5353';
    } else {
        obj.style.backgroundColor =  'white';
    }
}

function blurName(obj) {
    console.log(obj);
    if (obj.value.length > 30 || obj.value.length < 2) {
        console.log('Invalid Name');
        obj.style.backgroundColor = '#FF5353';
    } else {
        obj.style.backgroundColor =  'white';
    }
    //readyToSubmit();
}

function handleUserName(obj) {
    console.log(obj);
    if (obj.value.length > 25 || obj.value.length < 2) {
        console.log('Invalid Username');
        obj.style.backgroundColor = '#FF5353';
    } else {
        obj.style.backgroundColor = 'white';
    }//readyToSubmit();
}

function handleEmail(obj) {
    console.log(obj);
    if (!validateEmail(obj.value)) {
        console.log('Invalid Email');
        obj.style.backgroundColor = '#FF5353';
    } else {
        obj.style.backgroundColor =  'white';
    }
    //readyToSubmit();
}

function handlePassword(obj) {
    if(initialStartForPassword){
        initialStartForPassword = false;
        if(obj.value.length > 32 || obj.value.length < 7){
                console.log("password invalid length");
                setSubmittable(false);
        }
        return;
    }
    let password1 = document.getElementById("user_password");
    let password2 = document.getElementById('user_password_confirmation');
    if(obj == password1){ //called done by first password box
        if(password1.value.length > 6 || password1.value.length < 30){
            password1.style.backgroundColor = "white";
        }else{
            password1.style.backgroundColor = "#FF5353";
        }
        if(passwordEntry[1]){

        }

    }else{

    }
    if(state){

    }

    if (obj.value.length > 30 || obj.value.length < 4) {
        console.log('Invalid Password');
        obj.style.backgroundColor = '#FF5353';
        passwordEntry[0] = false;
        checkPassword();
    } else {
        passwordEntry[0] = true;
        checkPassword();
        obj.style.backgroundColor =  'white';
    }
    //readyToSubmit();
}

function handleConfirmPassword(obj) {
    console.log(obj);
    if (obj.value.length > 30 || obj.value.length < 4) {
        passwordEntry[1] = false;
        console.log('Invalid Password');
        obj.style.backgroundColor = '#FF5353';
        checkPassword();
    } else {
        passwordEntry[1] = true;
        checkPassword();
        obj.style.backgroundColor =  'white';
    }
    //readyToSubmit();
}

function checkPassword(){
    var password1 = document.getElementById('user_password').value;
    var password2 = document.getElementById("user_password_confirmation").value;
    if(password1 == password2){
        passwords = true;

    }else{
        passwords = false;
    }
}

function setMinMaxDate(obj) {
    var today = new Date();
    var hundredYears = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var yyyy100 = yyyy - 120;
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    hundredYears = yyyy100+'-'+mm+'-'+dd;
    obj.setAttribute("min", today);
    obj.setAttribute("max", hundredYears);
}

function handleBirthday(obj){

}


function handleHometown(obj){

}

function handleResidence(obj){

}




    //   $("#user_birthday").datepicker({
    //     defaultDate: +7
    //});
/*
    document.getElementById("user_birthday").defaultValue = "2010-01-01";
    //  $('#user_birthday').on('click', function () {
    //    $('#ui-datepicker-div').css('z-index', '100');
    //});
    $(".Avatar").on("click", function () {
        $("#avatarUpload").trigger("click");
    });
    $("#leftHeaderImage").on("click", function () {
        $("#firstHeader").trigger("click");
    });
    $("#rightHeaderImage").on("click", function () {
        $("#secondHeader").trigger("click");
    });

    $("#firstHeader").change(function () {
        var info;
        var firstHeaderPic = document.getElementById("leftHeaderImage");
        var first = new Croppie(firstHeaderPic);
    });
    $("#secondHeader").change(function () {
        var secondHeaderPic = document.getElementById("rightHeaderImage");
        var secondHeaderCrop = new Croppie(secondHeaderPic, {
            viewport: {
                width: $('#main').width / 2,
                height: $('.Images').height,
                type: 'square'
            },
            boundary: {
                width: $('#main').width / 2,
                height: $('.Images').height
            },
            showZoomer: false,
            update: function (data) {
                for (var i = 5; i < 9; i++) {
                    imagesProperties[i] = data.points[i - 5];
                }
                imagesProperties[9] = String(data.zoom);
                // console.log(imagesProperties);
            }
        });
    });
    $("#avatarUpload").change(function () {
        var avatarCrop = new Croppie(document.getElementById("avatarImage"), {
            viewport: {
                width: $('#avatar').width,
                height: $('#avatar').height,
                type: 'circle'
            },
            boundary: {
                width: $('#avatar').width,
                height: $('#avatar').height,

            },

            showZoomer: false,
            update: function (data) {
                for (var i = 10; i < 14; i++) {
                    imagesProperties[i] = data.points[i - 10];
                }
                imagesProperties[14] = String(data.zoom);
            }
        });
        $('#avatar .cr-boundary').css('border-radius', '50%');
    });
});

function readyToSubmit() {
    if ($('#user_name').css('background-color') != 'rgb(255, 83, 83)' && $('#user_name').val().length > 3) {
        //console.log("name");
        if ($('#user_username').css('background-color') != 'rgb(255, 83, 83)' && $('#user_username').val().length > 3) {
            //console.log("username");
            if ($('#user_email').css('background-color') != 'rgb(255, 83, 83)' && $('#user_email').val().length > 3) {
                //   console.log("email");
                if ($('#user_password').css('background-color') != 'rgb(255, 83, 83)' && $('#user_password').val().length > 3) {
                    //  console.log("passwor");
                    if ($('#user_password_confirmation').css('background-color') != 'rgb(255, 83, 83)' && $('#user_password_confirmation').val().length > 3) {
                        //      console.log("con password");
                        if ($('#user_birthday').css('background-color') != 'rgb(255, 83, 83)') {
                            //     console.log("birth");
                            if ($('#user_hometown').css('background-color') != 'rgb(255, 83, 83)' && $('#user_hometown').val().length > 3) {
                                //        console.log("home");
                                if ($('#user_location').css('background-color') != 'rgb(255, 83, 83)' && $('#user_location').val().length > 3) {
                                    //         console.log("lcoa");
                                    if (document.getElementById("user_Terms_of_Agreement").checked) {
                                        $('#submit').css('display', 'block');
                                        //var a = document.querySelector('#user_imagesproperties');
                                        //a.attributes.value = imagesProperties.toString();
                                        // console.log(imagesProperties.toString());
                                        $('#user_bio').val(imagesProperties.toString());
                                        geocode();
                                        $("#user_badgeColor").val(rgbColor1);
                                        $("#user_badgeTextColor").val(rgbColor2);
                                        //      console.log("user_imagesproperties " + $('#user_imagesproperties').val());
                                        //console.log("user_imagesproperties2 " + a.attributes.value);
                                        //          console.log("user_badgeColor" + $("#user_badgeColor").val());
                                        //         console.log("user_badgeTextColor" + $("#user_badgeTextColor").val());
                                        //    console.log("user_location " + $("#user_location").val());
                                        //    console.log("user_hometown " + $("#user_hometown").val());
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $('#submit').css('display', 'none');
*/

function geocode() {
    var location = $('#user_location').val();
    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        type: 'GET',
        data: {
            address: location,
            key: "AIzaSyABBVE90zE3SB_kb52KWFSS2Fqumy303do"
        },
        dataType: 'json',
        success: function (r) {
            console.log('success', r.results[0].geometry.location.lat);
            console.log('success', r.results[0].geometry.location.lng);
            $('#user_longitude').val(r.results[0].geometry.location.lng);
            $('#user_latitude').val(r.results[0].geometry.location.lat);
            //document.getElementById('user_longitude').attributes.value = r.results[0].geometry.location.lng.toString();
            //document.getElementById('user_latitude').attributes.value = r.results[0].geometry.location.lat.toString();

        },
        error: function (e) {
            console.log('error', e);
        }
    });
}

function scrolldown(){
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        } else if (event.keyCode == 9) {
            window.scrollBy(0, 50);
        }
    });
}

function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);
    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}
/*
var autocomplete;
var autocomplete2;
var country = 'all';
var countryRestrict = {'country': 'us'};
autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement}  (
        document.getElementById('user_hometown')), {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
    });
autocomplete2 = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement}  (
        document.getElementById('user_location')), {
        types: ['(cities)'],
        componentRestrictions: countryRestrict
    });
if (country == 'all') {
    autocomplete.setComponentRestrictions({'country': []});
    autocomplete2.setComponentRestrictions({'country': []});

}
infoWindow = new google.maps.InfoWindow({
    content: document.getElementById('info-content')
});
*/

function oneTimeImageSelection(imageDiv) {
    //console.log("imageDiv ", imageDiv);
    document.getElementById(imageDiv).disabled = true;
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(email) {
    if (validateEmail(email)) {
        //console.log("valid");
    } else {
        // console.log("non");
    }
}

function search() {
    var search = {
        types: ['lodging']
    };
    places.nearbySearch(search, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearResults();
            clearMarkers();
            // Create a marker for each hotel found, and
            // assign a letter of the alphabetic to each marker icon.
            for (var i = 0; i < results.length; i++) {
                var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
                var markerIcon = MARKER_PATH + markerLetter + '.png';
                // Use marker animation to drop the icons incrementally on the map.
                markers[i] = new google.maps.Marker({
                    position: results[i].geometry.location,
                    animation: google.maps.Animation.DROP,
                    icon: markerIcon
                });
                // If the user clicks a hotel marker, show the details of that hotel
                // in an info window.
                markers[i].placeResult = results[i];
                google.maps.event.addListener(markers[i], 'click', showInfoWindow);
                setTimeout(dropMarker(i), i * 100);
                addResult(results[i], i);
            }
        }
    });
}

function showInfoWindow() {
    var marker = this;
    places.getDetails({placeId: marker.placeResult.place_id},
        function (place, status) {
            if (status !== google.maps.places.PlacesServiceStatus.OK) {
                return;
            }
            infoWindow.open(map, marker);
            buildIWContent(place);
        });
}

// Load the place information into the HTML elements used by the info window.
function buildIWContent(place) {
    document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
        'src="' + place.icon + '"/>';
    document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
        '">' + place.name + '</a></b>';
    document.getElementById('iw-address').textContent = place.vicinity;
    if (place.formatted_phone_number) {
        document.getElementById('iw-phone-row').style.display = '';
        document.getElementById('iw-phone').textContent =
            place.formatted_phone_number;
    } else {
        document.getElementById('iw-phone-row').style.display = 'none';
    }
    // Assign a five-star rating to the hotel, using a black star ('&#10029;')
    // to indicate the rating the hotel has earned, and a white star ('&#10025;')
    // for the rating points not achieved.
    if (place.rating) {
        var ratingHtml = '';
        for (var i = 0; i < 5; i++) {
            if (place.rating < (i + 0.5)) {
                ratingHtml += '&#10025;';
            } else {
                ratingHtml += '&#10029;';
            }
            document.getElementById('iw-rating-row').style.display = '';
            document.getElementById('iw-rating').innerHTML = ratingHtml;
        }
    } else {
        document.getElementById('iw-rating-row').style.display = 'none';
    }
    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    if (place.website) {
        var fullUrl = place.website;
        var website = hostnameRegexp.exec(place.website);
        if (website === null) {
            website = 'http://' + place.website + '/';
            fullUrl = website;
        }
        document.getElementById('iw-website-row').style.display = '';
        document.getElementById('iw-website').textContent = website;
    } else {
        document.getElementById('iw-website-row').style.display = 'none';
    }
}
