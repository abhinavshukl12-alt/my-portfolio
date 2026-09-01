/* =========================================================
   ABHINAV PORTFOLIO — HYPER INTERACTION ENGINE
   ========================================================= */

(() => {
    "use strict";

    /* -------------------------------------------------------
       1. GLOBAL CURSOR + MOUSE LIGHT
    ------------------------------------------------------- */

    const root = document.documentElement;
    const cursor = document.querySelector(".cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    window.addEventListener("pointermove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        root.style.setProperty("--mx", `${mouseX}px`);
        root.style.setProperty("--my", `${mouseY}px`);
    });

    function animateCursor() {

        cursorX += (mouseX - cursorX) * 0.18;
        cursorY += (mouseY - cursorY) * 0.18;

        if (cursor) {
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* -------------------------------------------------------
       2. INTERACTIVE PARTICLE UNIVERSE
    ------------------------------------------------------- */

    const canvas = document.getElementById("life");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let width;
        let height;
        let particles = [];

        const mouse = {
            x: -1000,
            y: -1000
        };

        function resizeCanvas() {

            width = window.innerWidth;
            height = window.innerHeight;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = width * dpr;
            canvas.height = height * dpr;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(
                dpr,
                0,
                0,
                dpr,
                0,
                0
            );

            createParticles();
        }

        function createParticles() {

            const amount = Math.min(
                140,
                Math.max(45, Math.floor(width / 10))
            );

            particles = [];

            for (let i = 0; i < amount; i++) {

                particles.push({

                    x: Math.random() * width,
                    y: Math.random() * height,

                    vx: (Math.random() - 0.5) * 0.35,
                    vy: (Math.random() - 0.5) * 0.35,

                    radius: Math.random() * 1.6 + 0.4,

                    life: Math.random() * 100,

                    pulse: Math.random() * Math.PI * 2

                });

            }
        }

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        window.addEventListener(
            "pointermove",
            (e) => {

                mouse.x = e.clientX;
                mouse.y = e.clientY;

            }
        );

        /* Click = gravitational explosion */

        window.addEventListener(
            "click",
            (e) => {

                particles.forEach((particle) => {

                    const dx = particle.x - e.clientX;
                    const dy = particle.y - e.clientY;

                    const distance = Math.sqrt(
                        dx * dx + dy * dy
                    );

                    if (distance < 300) {

                        const force =
                            (300 - distance) / 300;

                        particle.vx +=
                            (dx / (distance || 1)) *
                            force *
                            2;

                        particle.vy +=
                            (dy / (distance || 1)) *
                            force *
                            2;
                    }

                });

            }
        );

        function particleLoop() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            /* PARTICLES */

            particles.forEach((p) => {

                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;

                const distance =
                    Math.sqrt(dx * dx + dy * dy);

                /* Mouse attraction */

                if (distance < 220) {

                    const force =
                        (220 - distance) / 220;

                    p.vx +=
                        (dx / (distance || 1)) *
                        force *
                        0.004;

                    p.vy +=
                        (dy / (distance || 1)) *
                        force *
                        0.004;

                }

                /* Natural movement */

                p.vx *= 0.993;
                p.vy *= 0.993;

                p.x += p.vx;
                p.y += p.vy;

                /* Wrap screen */

                if (p.x < -10)
                    p.x = width + 10;

                if (p.x > width + 10)
                    p.x = -10;

                if (p.y < -10)
                    p.y = height + 10;

                if (p.y > height + 10)
                    p.y = -10;

                p.pulse += 0.02;

                const alpha =
                    0.35 +
                    Math.sin(p.pulse) * 0.15;

                ctx.beginPath();

                ctx.arc(
                    p.x,
                    p.y,
                    p.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(231,149,63,${alpha})`;

                ctx.fill();

            });


            /* CONNECTION NETWORK */

            for (let i = 0; i < particles.length; i++) {

                for (
                    let j = i + 1;
                    j < particles.length;
                    j++
                ) {

                    const a = particles[i];
                    const b = particles[j];

                    const dx = a.x - b.x;
                    const dy = a.y - b.y;

                    const distance =
                        Math.sqrt(
                            dx * dx + dy * dy
                        );

                    if (distance < 110) {

                        const opacity =
                            0.09 *
                            (1 - distance / 110);

                        ctx.beginPath();

                        ctx.moveTo(
                            a.x,
                            a.y
                        );

                        ctx.lineTo(
                            b.x,
                            b.y
                        );

                        ctx.strokeStyle =
                            `rgba(231,149,63,${opacity})`;

                        ctx.lineWidth = 0.6;

                        ctx.stroke();

                    }

                }

            }

            requestAnimationFrame(
                particleLoop
            );
        }

        resizeCanvas();
        particleLoop();

    }


    /* -------------------------------------------------------
       3. SCROLL REVEAL
    ------------------------------------------------------- */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );

    revealElements.forEach(
        (element) => {
            revealObserver.observe(element);
        }
    );


    /* -------------------------------------------------------
       4. 3D PROJECT TILT
    ------------------------------------------------------- */

    const tiltElements =
        document.querySelectorAll(
            "[data-tilt]"
        );

    tiltElements.forEach((element) => {

        element.addEventListener(
            "pointermove",
            (e) => {

                const rect =
                    element.getBoundingClientRect();

                const x =
                    (e.clientX - rect.left) /
                    rect.width;

                const y =
                    (e.clientY - rect.top) /
                    rect.height;

                const rotateX =
                    (0.5 - y) * 7;

                const rotateY =
                    (x - 0.5) * 7;

                element.style.transform =
                    `perspective(1400px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );

        element.addEventListener(
            "pointerleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });


    /* -------------------------------------------------------
       5. MAGNETIC CURSOR
    ------------------------------------------------------- */

    const interactiveElements =
        document.querySelectorAll(
            "a, button, input, textarea"
        );

    interactiveElements.forEach(
        (element) => {

            element.addEventListener(
                "mouseenter",
                () => {

                    if (cursor) {
                        cursor.classList.add(
                            "big"
                        );
                    }

                }
            );

            element.addEventListener(
                "mouseleave",
                () => {

                    if (cursor) {
                        cursor.classList.remove(
                            "big"
                        );
                    }

                }
            );

        }
    );


    /* -------------------------------------------------------
       6. MAGNETIC BUTTON EFFECT
    ------------------------------------------------------- */

    const magneticElements =
        document.querySelectorAll(
            ".round-link, .talk, .big-arrow, form button"
        );

    magneticElements.forEach(
        (element) => {

            element.addEventListener(
                "pointermove",
                (e) => {

                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        e.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        e.clientY -
                        rect.top -
                        rect.height / 2;

                    element.style.transform =
                        `translate(${x * 0.12}px,
                                   ${y * 0.12}px)`;

                }
            );

            element.addEventListener(
                "pointerleave",
                () => {

                    element.style.transform =
                        "";

                }
            );

        }
    );


    /* -------------------------------------------------------
       7. TEXT SCRAMBLE EFFECT
    ------------------------------------------------------- */

    const scrambleCharacters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    function scrambleText(element) {

        const original =
            element.textContent;

        let iteration = 0;

        const interval =
            setInterval(() => {

                element.textContent =
                    original
                        .split("")
                        .map((character, index) => {

                            if (index < iteration) {
                                return original[index];
                            }

                            if (
                                character === " "
                            ) {
                                return " ";
                            }

                            return scrambleCharacters[
                                Math.floor(
                                    Math.random() *
                                    scrambleCharacters.length
                                )
                            ];

                        })
                        .join("");

                iteration += 0.35;

                if (
                    iteration >= original.length
                ) {

                    element.textContent =
                        original;

                    clearInterval(interval);

                }

            }, 25);

    }


    document.querySelectorAll(
        ".project h3, .feature-info h2"
    ).forEach((element) => {

        element.addEventListener(
            "mouseenter",
            () => {

                scrambleText(element);

            }
        );

    });


    /* -------------------------------------------------------
       8. PARALLAX HERO
    ------------------------------------------------------- */

    const hero =
        document.querySelector(".hero");

    const heroTitle =
        document.querySelector(".hero h1");

    const portrait =
        document.querySelector(".portrait");

    window.addEventListener(
        "pointermove",
        (e) => {

            if (!hero) return;

            const x =
                e.clientX /
                window.innerWidth -
                0.5;

            const y =
                e.clientY /
                window.innerHeight -
                0.5;

            if (heroTitle) {

                heroTitle.style.transform =
                    `translate(
                        ${x * 10}px,
                        ${y * 7}px
                    )`;

            }

            if (portrait) {

                portrait.style.marginTop =
                    `${y * 12}px`;

            }

        }
    );


    /* -------------------------------------------------------
       9. EASTER EGG — CLICK A/ 7 TIMES
    ------------------------------------------------------- */

    const logo =
        document.querySelector(".mark");

    let logoClicks = 0;

    if (logo) {

        logo.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                logoClicks++;

                if (logoClicks >= 7) {

                    logoClicks = 0;

                    document.body.classList.toggle(
                        "secret"
                    );

                }

            }
        );

    }


    /* -------------------------------------------------------
       10. KONAMI CODE
    ------------------------------------------------------- */

    const konami = [
        "arrowup",
        "arrowup",
        "arrowdown",
        "arrowdown",
        "arrowleft",
        "arrowright",
        "arrowleft",
        "arrowright",
        "b",
        "a"
    ];

    let konamiIndex = 0;

    window.addEventListener(
        "keydown",
        (event) => {

            const key =
                event.key.toLowerCase();

            if (
                key ===
                konami[konamiIndex]
            ) {

                konamiIndex++;

                if (
                    konamiIndex ===
                    konami.length
                ) {

                    konamiIndex = 0;

                    document.body.classList.toggle(
                        "secret"
                    );

                }

            } else {

                konamiIndex = 0;

            }

        }
    );


    /* -------------------------------------------------------
       11. CLICK RIPPLE
    ------------------------------------------------------- */

    document.addEventListener(
        "click",
        (e) => {

            const ripple =
                document.createElement(
                    "span"
                );

            ripple.style.position =
                "fixed";

            ripple.style.left =
                `${e.clientX}px`;

            ripple.style.top =
                `${e.clientY}px`;

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.border =
                "1px solid rgba(231,149,63,.7)";

            ripple.style.borderRadius =
                "50%";

            ripple.style.pointerEvents =
                "none";

            ripple.style.zIndex =
                "999";

            ripple.style.transform =
                "translate(-50%,-50%)";

            ripple.style.transition =
                "all .7s cubic-bezier(.2,.8,.2,1)";

            document.body.appendChild(
                ripple
            );

            requestAnimationFrame(() => {

                ripple.style.width =
                    "180px";

                ripple.style.height =
                    "180px";

                ripple.style.opacity =
                    "0";

            });

            setTimeout(
                () => ripple.remove(),
                750
            );

        }
    );


    /* -------------------------------------------------------
       12. SMOOTH HOVER IMAGE SCALE
    ------------------------------------------------------- */

    document.querySelectorAll(
        ".project, .feature"
    ).forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.style.zIndex =
                    "5";

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.zIndex =
                    "";

            }
        );

    });


    /* -------------------------------------------------------
       13. PAGE LOADER
    ------------------------------------------------------- */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                document.body.classList.add(
                    "loaded"
                );

            }, 150);

        }
    );


    /* -------------------------------------------------------
       14. REDUCED MOTION SUPPORT
    ------------------------------------------------------- */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        document
            .querySelectorAll(".reveal")
            .forEach((element) => {

                element.classList.add(
                    "show"
                );

            });

    }

})();
