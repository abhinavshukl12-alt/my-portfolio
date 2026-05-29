function toggleTheme() {

    document.body.classList.toggle("light");
}

/* fake visitors */
document.getElementById("v").innerText =
Math.floor(Math.random() * 900) + 100;


/* popup opens after 3 sec */

setTimeout(() => {

document.getElementById("popup")
.style.display = "block";

}, 3000);

/* close popup */

function closePopup() {

document.getElementById("popup")
.style.display = "none";
}
document.addEventListener(
"mousemove",

e => {

    const dot =
    document.createElement("div");

    dot.className =
    "trail";

    dot.style.left =
    e.pageX + "px";

    dot.style.top =
    e.pageY + "px";

    document.body.appendChild(dot);

    setTimeout(() => {

        dot.remove();

    }, 500);
});
