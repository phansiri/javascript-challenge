/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
document.addEventListener('DOMContentLoaded', function() {
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

})