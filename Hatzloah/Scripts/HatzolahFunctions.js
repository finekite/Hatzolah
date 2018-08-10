    function addClassToElement(targetElement, classToAdd) {
        $(targetElement).addClass(classToAdd);
    }

    function removeClassFromelement(targetElement, classToRemove) {
        $(targetElement).removeClass(classToAdd);
    }

    function hideElement(elementToHide) {
        $(elementToHide).hide();
    }

    function makeAjaxCall(url, httpType, headers, crossDomain, argumentName, data, successCallBack) {
        $.ajax({
            async: false,
            headers: headers,
            type: httpType,
            url: url + "?" + argumentName + "=" + data,
            crossDomain: crossDomain,
            success: function (result, textStatus, request) {
                successCallBack(result);
            },
            error: function (txhr, ajaxOptions, thrownError) {
                console.log(thrownError);
            }
        })
    }

    function logTheTime(id) {
        var date = new Date();
        var time = date.toLocaleTimeString();
        document.getElementById(id).innerHTML = time;
    }

    function showElement(elementToShow) {
        $(elementToShow).show();
    }

    function populateElementsWithValues(elementstoBePoplulated, valuesToPopulate) {
        $.each(elementstoBePoplulated, function (index, value) {
            document.getElementById(elementstoBePoplulated).innerHTML = valuesToPopulate[index];
        });
    }

    function parseValueFromInput(inputClassOrId, characterToSplitBy, elementAtToExtract) {
        var elementValue = $(inputClassOrId).val();
        var splitValue = elementValue.split(characterToSplitBy);
        return splitValue[elementAtToExtract];
    }