// Lit Phansiri
// INFO 343

"use strict";

function onReady () {
    var signup = document.getElementById('signup');

    //Load the State Select
    var state = signup.elements['state'];
    var idx;
    var option;
    for (idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        state.appendChild(option);
    }

    //hide and show the Occupation Other Input
    var otherPop = document.getElementById('occupation');
    otherPop.addEventListener('change', function() {
        var occupationOther = signup.elements['occupationOther'];
        var msgElem = document.getElementById('birthdateMessage');
        if (otherPop.value == 'student') {
            occupationOther.value = 'Student';
        }
        if (otherPop.value == 'teacher') {
            occupationOther.value = 'Teacher';
        }
        if (otherPop.value == 'bum') {
            occupationOther.value = 'Bum';
        }
        if (otherPop.value == 'other') {
            occupationOther.value = '';
            occupationOther.style.display = 'block';
        } else {
            occupationOther.style.display = 'none';
        }
    });

    //Confirm the "No Thanks" Button
    var noThank = document.getElementById('cancelButton');
    noThank.addEventListener('click', function() {
        if (window.confirm('Are you sure?')) {
            window.location = 'http://www.google.com';
        }
    });

    signup.addEventListener('submit', onSubmit);
}

function onSubmit(evt) {
    //age verification
    var birthdate = this.elements['birthdate'].value;
    try {
        var age = calculateAge(birthdate);
        if (age < 13) {
            displayMessage('You must be 13 years or older to sign up!', true);
            evt.preventDefault();
        } else {
            displayMessage("", false);
        }
    }

    catch(exception) {
        displayError(exception, true);
    }

    //validate the required blocks
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault()) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate', 'occupationOther'];
    var idx;
    var formValid = true;
    for (idx = 0; idx < requiredFields.length; ++idx) {
        formValid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    return formValid;
}

function validateRequiredField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if (field == signup.elements['zip']) {
        var zipRegExp = new RegExp('^\\d{5}$');
        if (!zipRegExp.test(field.value.trim())) {
            //let me go
            alert("Your zip code must be exactly 5 only numbers!");
            valid = false;
        } else {
            valid = true;
        }
    }
    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

//age calculation
function calculateAge(dob) {
    return moment().diff(dob, 'years');
}
function displayError(exception) {
    displayMessage(error);
}
function displayMessage(message, isError) {
    var msgElem = document.getElementById('birthdateMessage');
    msgElem.innerHTML = message;
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success';
    if (isError) {
        msgElem.style.display = 'block';
    } else {
        msgElem.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', onReady);
