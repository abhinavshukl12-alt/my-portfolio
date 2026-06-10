const omega = document.createElement("div");

omega.innerHTML = "🟡";
omega.id = "omega";

document.body.appendChild(omega);

let x = 100;
let dir = 1;

function animate() {

    x += dir * 2;

    if (x > window.innerWidth - 50)
        dir = -1;

    if (x < 0)
        dir = 1;

    omega.style.left = x + "px";

    requestAnimationFrame(animate);
}

animate();
