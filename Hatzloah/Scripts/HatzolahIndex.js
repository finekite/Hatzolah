
    window.onload = function () {
        var input = document.getElementById('address');
        var autocomplete = new google.maps.places.Autocomplete(input);
    }

    function addNocs(nocs) {
        var availableTags = [];
        for (var desc in nocs) {
            availableTags.push(nocs[desc]);
        }

        $(function () {
            $("#noc").autocomplete({
                source: availableTags
            });
        });
    }


    function addAddressAndCrossRoads() {
        addClassToElement('#loader', 'fa fa-refresh fa-spin');
        var geocoder = new google.maps.Geocoder();
        var address = document.getElementById('address').value;

        geocoder.geocode({ 'address': address }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                var geoNamesUrl = 'http://api.geonames.org/findNearestIntersectionJSON?' + "lat=" + latitude + "&lng=" + longitude + "&username=gutezach";
                var headers = { "Accept": "application/json" };

                makeAjaxCall(geoNamesUrl, 'GET', headers, true, null, onGeoNmaesSuccess);
            }
        });
    }

    function onGeoNmaesSuccess(result) {

        hideElement('#loader');
        showElement('#cross-roads-title');

        var elementsToBePopulated = ["input-address", "input-cross-roads", "input-city"];
        var valuesToPopulate = [address, result.intersection.street1 + " and " + result.intersection.street2, result.intersection.placename];
        populateElementsWithValues(elementsToBePopulated, valuesToPopulate);

        addApt();
        popUpGooleMapsIframe(address);
        fullText();
    }

    function popUpGooleMapsIframe(address) {
        address = address.replace(/,/g, '').replace(/ /g, '+');
        $('.i-frame').empty();
        var url = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBL9zxve1LUJcZLtkulO_ARoR1Qw3NhGWg&q=" + address;
        $('<iframe width= "400" height= "300" frameborder= "0" style= "border:3px" src="' + url + '"></iframe>').appendTo('.i-frame');
        google.maps.event.addListener(map, 'click', function (event) {
            alert("Latitude: " + event.latLng.lat() + " " + ", longitude: " + event.latLng.lng());
        });
    }

    function addNoc() {

        showElement('#loader');
        var nocId = parseValueFromInput('#noc', '.', 0);
        makeAjaxCall(getNocUrl, 'GET', null, null, "nocId", nocId, onGetNocSuccess);

    }

    function onGetNocSuccess(param) {

        hideElement('#loader');

        populateElementsWithValues(['noc-desc'], [param]);

        var question = $("#question").html();

        if (question != null && question.length > 0) {
            document.getElementById("additional-questions").innerHTML = question;
            showElement('#additional-questions-hidden');
            showElement('#additional-questions-title');
        }
        else {
            showElement('#additional-questions-hidden');
            hideElement('#additional-questions-title');
        }
    }

    function addAdditionalResponder(i) {
        var additionalResponder = $('#additional-responder' + i).val();
        var address = $('#address').val();
        var addressSplit = address.split(",");
        address = addressSplit[0];
        var city = $('#input-city').text();
        var noc = $('#noc').val();
        var aptNum = $('#apt-num').val();
        $('#additional-responder-input').append('<div class=\"row\"><div class=\"col-lg-6\"><p id=\"input-additional-responder' + i + '\"><\/p><\/div><div class=\"col-lg-6\"><div class=\"row\"><p id=\"input-additional-responder-call-time' + i + '\"><\/p><\/div><div class=\"row\"><p id=\"additional-responder-arrived-time' + i + '\"><\/p><\/div><\/div><\/div>');
        if (aptNum.length > 0) {
            document.getElementById("input-additional-responder" + i).innerHTML = additionalResponder + " please proceed to " + address + " Apt: " + aptNum + " in " + city;
        }
        else {
            document.getElementById("input-additional-responder" + i).innerHTML = additionalResponder + " please proceed to " + address + " in " + city;
        }
        var d = new Date();
        var responder1time = d.toLocaleTimeString();
        document.getElementById("input-additional-responder-call-time" + i).innerHTML = additionalResponder + " responded at " + responder1time;
    }


    function fullText() {
        var crossroads = $('#input-cross-roads').text();
        var city = $('#input-city').text();
        var address = $('#address').val();
        var noc = $('#final-noc-code').text();
        if ($('#id-code-1').val() == "true") {
            document.getElementById("full-text").innerHTML = "<b>CODE 1</b> - ANY UNITS AVALIABLE IN <b>" + city + " </b>AT <b>" + crossroads + " </b>FOR A <b>" + noc + "</b>";
        }
        else {
            document.getElementById("full-text").innerHTML = "ANY UNITS AVALIABLE IN <b>" + city + " </b>AT <b>" + crossroads + " </b>FOR A <b>" + noc + "</b>";
        }
    }

    function addTel() {
        var telnum = $('#tel').val();
        telnum = telnum.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/, '$1-$2-$3');
        document.getElementById("input-tel").innerHTML = telnum;
    }

    function addApt() {
        var aptNum = $('#apt-num').val();
        if (aptNum.length > 0) {
            document.getElementById("input-address").innerHTML += ": Apt " + aptNum;
        }
    }

    var i = 0;
    function addResponders(e) {
        if (e === null || e == undefined) {
            for (var j = 1; j < 3; j++) {
                i++;
                $('#additional-responders').append('<h4>Responder ' + i + '<\/h4>\r\n<div class=\"row\">\r\n<div class=\"col-lg-9\">\r\n<input id=\"additional-responder' + i + '\" onblur=\"addAdditionalResponder(' + i + ')\" class=\"form-control\" placeholder=\"Additional Responder\" style=\"width:90%;\" \/>\r\n<\/div>\r\n<div class=\"col-lg-3\">\r\n<button onclick=\"logTheTime(\'additional-responder-arrived-time' + i + '\')\" class=\"btn btn-danger\">Arrived<\/button>\r\n<\/div>\r\n<\/div>');
            }
        } else {
            i++;
            $('#additional-responders').append('<h4>Responder ' + i + '<\/h4>\r\n<div class=\"row\">\r\n<div class=\"col-lg-9\">\r\n<input id=\"additional-responder' + i + '\" onblur=\"addAdditionalResponder(' + i + ')\" class=\"form-control\" placeholder=\"Additional Responder\" style=\"width:90%;\" \/>\r\n<\/div>\r\n<div class=\"col-lg-3\">\r\n<button onclick=\"logTheTime(\'additional-responder-arrived-time' + i + '\')\" class=\"btn btn-danger\">Arrived<\/button>\r\n<\/div>\r\n<\/div>');
        }
    }


    function printPdf() {
        var obj = new Object();
        obj.starttime = $('#demo').text();
        obj.address = "45";
        obj.married = true;
        var jsonStrings = JSON.stringify(obj);
        $.get('@Url.Action("PrintPdf", "Home")', { text: jsonStrings });
    }