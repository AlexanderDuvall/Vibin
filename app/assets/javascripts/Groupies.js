function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(29.793, -95.367),
        zoom: 12,
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
}

function HelloGroupies() {
    console.log("Hello, Groupies");
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
