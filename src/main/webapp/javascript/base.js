let KEYS = {
    userIdenfier: 'user_id'
};

function setUserIdentifier(identifier) {
    saveValueToSession(KEYS.userIdenfier, identifier.toString());
}

function getUserIdentifier() {
    return parseInt(getValueFromSession(KEYS.userIdenfier));
}

function saveValueToSession(key, value) {
    sessionStorage.setItem(key, value);
}

function getValueFromSession(key) {
    return sessionStorage.getItem(key);
}

function isCustomerLoggedIn() {
    return typeof getUserIdentifier() === 'number';
}


function logout() {
   
   setUserIdentifier(-1);
   window.location.href = "../index.html";
}
