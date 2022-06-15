function ScrollManager() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (winScroll > document.getElementById("nav").offsetHeight) document.querySelector(".header").style.display = "block";
    else document.querySelector(".header").style.display = "none";
    document.getElementById("myBar").style.width = scrolled + "%";
}

window.onscroll = function () { ScrollManager() };