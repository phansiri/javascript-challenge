/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
'use strict';
function onReady() {}
    //Load the State Select
    var signup = document.getElementById('signup');
    var state = signup.elements['state'];
    var idx;
    var option;
    for (idx = 0; idx <usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        state.appendChild(option);
    }

    //hide and show the Occupation Other Input
    var otherPop = document.getElementById('occupation');
    otherPop.addEventListener('change', function() {
        var  occupationOther = signup.elements['occupationOther'];
        occupationOther.style.display = 'block';
    });

    //Confirm the "No Thanks" Button
    var noThank = document.getElementById('cancelButton');
    noThank.addEventListener('click', function() {
        if (window.confirm('Are you sure?')) {
            window.location = 'http://www.google.com';
        }

    signup.addEventListener('submit', onSubmit);

    });

function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

//Validate the Form Before Submit
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
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
    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

document.addEventListener('DOMContentLoaded', onReady);
