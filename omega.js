const omega = document.createElement("div");

omega.id = "omega";

omega.innerHTML = `
<div class="head">
    <div class="eye left-eye"></div>
    <div class="eye right-eye"></div>
</div>
<div class="body"></div>
`;

document.body.appendChild(omega);

let x = 200;
let dir = 1;

function animate() {

    x += dir * 2;

    if (x > window.innerWidth - 100)
        dir = -1;

    if (x < 0)
        dir = 1;

    omega.style.left = x + "px";

    requestAnimationFrame(animate);
}

animate();

document.addEventListener("mousemove", (e) => {

    const eyes = document.querySelectorAll(".eye");

    eyes.forEach(eye => {

        const rect = eye.getBoundingClientRect();

        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const angle = Math.atan2(
            e.clientY - eyeY,
            e.clientX - eyeX
        );

        const pupilX = Math.cos(angle) * 3;
        const pupilY = Math.sin(angle) * 3;

        eye.style.transform =
            `translate(${pupilX}px, ${pupilY}px)`;
    });

});
