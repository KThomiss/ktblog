const hamburgerButton = document.querySelector("#hamburger-button");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerButton.addEventListener("click", function() {
    hamburgerMenu.classList.toggle("active");
    
});