const subButton = document.querySelector (".cta-subscribe");
const subMessage = document.querySelector(".subMessage");
const subErrorMessage = document.querySelector(".subErrorMessage");
const subEmail = document.querySelector("#subEmail");

subButton.onclick = function() {
    if(validateEmail(subEmail.value) === true) {
        subErrorMessage.style.display = "none";
    } else {
        subMessage.style.display = "none";
    }
    validateSubEmail();
}

function validateSubEmail() {
    if (validateEmail(subEmail.value) === true) {
        subMessage.style.display = "block";
    } else {
        subErrorMessage.style.display = "block";
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const emailRequirement = regEx.test(email);
    return emailRequirement
}