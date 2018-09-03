let menuIcon = document.querySelector(".heading");
let content = document.querySelector(".content");
let navBar= document.querySelector(".nav-bar");

menuIcon.addEventListener("click", function(event){
    navBar.classList.toggle("open");
});

content.addEventListener("click", function(event){
    navBar.classList.remove("open");
})