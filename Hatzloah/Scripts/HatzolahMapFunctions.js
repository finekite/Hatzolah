    window.onload = function () {
        var input = document.getElementById('address');
        var autocomplete = new google.maps.places.Autocomplete(input);
    };



    function addAddressAndCrossRoads() {
        addClassToElement('#loader', 'fa fa-refresh fa-spin');
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('address').value;

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status === google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                var geoNamesUrl = 'https://secure.geonames.org/findNearestIntersectionJSON';
                var params = `lat=${latitude}&lng=${longitude}&username=gutezach`;
                var headers = { "Accept": "application/json" };

                makeAjaxCallGet(geoNamesUrl, 'GET', headers, true, params, null, onGeoNmaesSuccess);
            }
        });
    }

    function onGeoNmaesSuccess(result) {

        hideElement('#loader');
        showElement('#cross-roads-title');

        var address = document.getElementById('address').value;
        var elementsToBePopulated = ["input-address", "input-cross-roads", "input-city"];
        var valuesToPopulate = [address, result.intersection.street1 + " and " + result.intersection.street2, result.intersection.placename];
        populateElementsWithValues(elementsToBePopulated, valuesToPopulate);

        addApt();
        popUpGooleMapsIframe(address);
    }

    function popUpGooleMapsIframe(address) {
        address = address.replace(/,/g, '').replace(/ /g, '+');
        $('.i-frame').empty();
        var url = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBL9zxve1LUJcZLtkulO_ARoR1Qw3NhGWg&q=" + address;
        $('<iframe width= "400" height= "300" frameborder= "0" style= "border:3px" src="' + url + '"></iframe>').appendTo('.i-frame');
    }