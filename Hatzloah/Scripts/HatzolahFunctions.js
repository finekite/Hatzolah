    function addClassToElement(targetElement, classToAdd) {
        $(targetElement).addClass(classToAdd);
    }

    function removeClassFromelement(targetElement, classToRemove) {
        $(targetElement).removeClass(classToAdd);
    }

    function hideElement(elementToHide) {
        $(elementToHide).hide();
    }

    function makeAjaxCallGet(url, httpType, headers, crossDomain, paramName, data, successCallBack) {

        // temp fix. Ideally create a method to construct the url with muliple params
        var url;
        if (data != null) {
            url = url + "?" + paramName + "=" + data;
        } else {
            url = url + "?" + paramName;
        }

        $.ajax({
            async: false,
            headers: headers,
            type: httpType,
            url: url,
            crossDomain: crossDomain,
            success: function (result, textStatus, request) {
                successCallBack(result);
            },
            error: function (txhr, ajaxOptions, thrownError) {
                console.log(thrownError);
            }
        })
    }

    function logTheTime(id, optionalTextToDisplayWithTime = '') {
        var date = new Date();
        var time = date.toLocaleTimeString();

        if (optionalTextToDisplayWithTime.length > 0) {
            document.getElementById(id).innerHTML = optionalTextToDisplayWithTime + time;
        } else {
            document.getElementById(id).innerHTML = time;
        }
    }

    function showElement(elementToShow) {
        $(elementToShow).show();
    }

    function populateElementsWithValues(elementstoBePoplulated, valuesToPopulate) {
        $.each(elementstoBePoplulated, function (index, value) {
            document.getElementById(value).innerHTML = valuesToPopulate[index];
        });
    }

    function parseValueFromInput(inputClassOrId, characterToSplitBy, elementAtToExtract) {
        var elementValue = $(inputClassOrId).val();
        var splitValue = elementValue.split(characterToSplitBy);
        return splitValue[elementAtToExtract];
    }

    function stringFormat(stringToFormat, argument) {
        if (stringToFormat != null && argument != null) {
            var character = new RegExp("\\{0\\}");
            stringToFormat = stringToFormat.replace(character, argument)
        }
        return stringToFormat;
    }

    function populateDivWithHtmlTemplate(url, divToPopulate) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                $(divToPopulate).append(stringFormat(html, responderCount));
            });
    }