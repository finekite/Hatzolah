
window.onload = function () {
    var input = document.getElementById('address');
    var autocomplete = new google.maps.places.Autocomplete(input);
};

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

            if (status === google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                var geoNamesUrl = 'http://api.geonames.org/findNearestIntersectionJSON';
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
        fullText();
    }

    function popUpGooleMapsIframe(address) {
        address = address.replace(/,/g, '').replace(/ /g, '+');
        $('.i-frame').empty();
        var url = "https://www.google.com/maps/embed/v1/search?key=AIzaSyBL9zxve1LUJcZLtkulO_ARoR1Qw3NhGWg&q=" + address;
        $('<iframe width= "400" height= "300" frameborder= "0" style= "border:3px" src="' + url + '"></iframe>').appendTo('.i-frame');
    }

    function addNoc() {
        showElement('#loader');
        var nocId = parseValueFromInput('#noc', '.', 0);
        makeAjaxCallGet(getNocUrl, 'GET', null, null, "nocId", nocId, onGetNocSuccess);
    }

    function onGetNocSuccess(param) {

        hideElement('#loader');

        populateElementsWithValues(['noc-desc'], [param]);

        var question = $("#question").html();

        if (question !== null && question !== undefined && question.length > 0) {
            document.getElementById("additional-questions").innerHTML = question;
            showElement('#additional-questions-hidden');
            showElement('#additional-questions-title');
        }
        else {
            showElement('#additional-questions-hidden');
            hideElement('#additional-questions-title');
        }

        fullText();
    }

    function addAdditionalResponder(responderNumber) {

        populateDivWithHtmlTemplate("http://localhost:59467/addrespondertemplate.html", '#additional-responder-input', [responderNumber], onSuccessPopulateHtml);
    }  

    function onSuccessPopulateHtml(responderNumber) {
        var additionalResponder = $('#additional-responder' + responderNumber).val();
        var city = $('#input-city').text();
        var noc = $('#noc').val();
        var address = parseValueFromInput('#address', ",", 0);
        var aptNum = $('#apt-num').val();
        var responderTextInfo;

        if (aptNum.length > 0) {
            responderTextInfo = `${additionalResponder} please proceed to ${address} Apt: ${aptNum} in ${city}`;
        }
        else {
            responderTextInfo = `${additionalResponder} please proceed to ${address} in ${city}`;
        }

        populateElementsWithValues(["input-additional-responder" + responderNumber], [responderTextInfo]);

        var responderRespondedTimeText = `${additionalResponder} responded at`;
        logTheTime("input-additional-responder-call-time" + responderNumber, responderRespondedTimeText);
    }


    function fullText() {
        var crossroads = $('#input-cross-roads').text();
        var city = $('#input-city').text();
        var address = $('#address').val();
        var noc = $('#final-noc-code').text();
        var code1 = $('#id-code-1').val() === "true" ? "Code - " : "";
        populateDivWithHtmlTemplate("http://localhost:59467/responderinfotemplate.html", '#full-text', [code1 , city, crossroads, noc])
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

    var responderCount = 0;
    function addResponders(e) {
        if (e === null || e === undefined) {
            for (var j = 1; j < 3; j++) {
                responderCount++;
                $('#additional-responders').append('<h4>Responder ' + responderCount + '<\/h4>\r\n<div class=\"row\">\r\n<div class=\"col-lg-9\">\r\n<input id=\"additional-responder' + responderCount + '\" onblur=\"addAdditionalResponder(' + responderCount + ')\" class=\"form-control\" placeholder=\"Additional Responder\" style=\"width:90%;\" \/>\r\n<\/div>\r\n<div class=\"col-lg-3\">\r\n<button onclick=\"logTheTime(\'additional-responder-arrived-time' + responderCount + '\')\" class=\"btn btn-danger\">Arrived<\/button>\r\n<\/div>\r\n<\/div>');
            }
        } else {
            responderCount++;
            $('#additional-responders').append('<h4>Responder ' + responderCount + '<\/h4>\r\n<div class=\"row\">\r\n<div class=\"col-lg-9\">\r\n<input id=\"additional-responder' + responderCount + '\" onblur=\"addAdditionalResponder(' + responderCount + ')\" class=\"form-control\" placeholder=\"Additional Responder\" style=\"width:90%;\" \/>\r\n<\/div>\r\n<div class=\"col-lg-3\">\r\n<button onclick=\"logTheTime(\'additional-responder-arrived-time' + responderCount + '\')\" class=\"btn btn-danger\">Arrived<\/button>\r\n<\/div>\r\n<\/div>');
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