
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

        populateDivWithHtmlTemplate(addResponderUrl, '#additional-responder-input', [responderNumber], onSuccessPopulateHtml);
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
        populateDivWithHtmlTemplate(responderInfoUrl, '#full-text', [code1 , city, crossroads, noc])
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
                populateDivWithHtmlTemplate(additionalResponderUrl, "#additional-responders", [responderCount], null)
            }
        } else {
            responderCount++;
            populateDivWithHtmlTemplate(additionalResponderUrl, "#additional-responders", [responderCount], null)
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