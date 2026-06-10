const omega = document.createElement("div");

omega.innerHTML = "🟡";

omega.style.position = "fixed";
omega.style.left = "200px";
omega.style.bottom = "100px";
omega.style.fontSize = "80px";
omega.style.zIndex = "999999";
omega.style.pointerEvents = "none";

document.body.appendChild(omega);

let x = 200;
let dir = 1;

function animate() {

    x += dir * 3;

    if (x > window.innerWidth - 100) {
        dir = -1;
    }

    if (x < 0) {
        dir = 1;
    }

    omega.style.left = x + "px";

    requestAnimationFrame(animate);
}

animate();
