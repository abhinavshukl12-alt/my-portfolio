/* =========================================================
   ABHINAV PORTFOLIO — CORE ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Typing Hero ---------- */

    const typing = document.getElementById("typing");

    if (typing) {
        const text = "ABHINAV";
        let i = 0;

        function type() {
            if (i < text.length) {
                typing.textContent += text[i];
                i++;
                setTimeout(type, 120);
            }
        }

        type();
    }


    /* ---------- Live Clock ---------- */

    const clock = document.getElementById("clock");

    if (clock) {

        function updateClock() {

            const now = new Date();

            clock.textContent =
                now.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                });

        }

        updateClock();
        setInterval(updateClock, 1000);
    }


    /* ---------- Scroll Reveal ---------- */

    const revealItems =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        revealItems.forEach(el => observer.observe(el));

    } else {

        revealItems.forEach(el =>
            el.classList.add("show")
        );

    }


    /* ---------- Smooth Internal Links ---------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (!targetID || targetID === "#") return;

            const target =
                document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ---------- Magnetic Buttons ---------- */

    document.querySelectorAll(
        ".talk, .round-link, .big-arrow, .input button, form button"
    ).forEach(button => {

        button.addEventListener("pointermove", e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });

        button.addEventListener("pointerleave", () => {

            button.style.transform = "";

        });

    });


    /* ---------- Project Card Tilt ---------- */

    document.querySelectorAll(
        "[data-tilt]"
    ).forEach(card => {

        card.addEventListener("pointermove", e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                (e.clientX - rect.left) /
                rect.width;

            const y =
                (e.clientY - rect.top) /
                rect.height;

            const rotateY =
                (x - 0.5) * 8;

            const rotateX =
                (y - 0.5) * -8;

            card.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-6px)`;

        });

        card.addEventListener("pointerleave", () => {

            card.style.transform = "";

        });

    });


    /* ---------- Cursor ---------- */

    const cursor =
        document.querySelector(".cursor");

    if (cursor) {

        window.addEventListener(
            "pointermove",
            e => {

                cursor.style.left =
                    `${e.clientX}px`;

                cursor.style.top =
                    `${e.clientY}px`;

            }
        );


        document.querySelectorAll(
            "a, button, input, textarea"
        ).forEach(element => {

            element.addEventListener(
                "pointerenter",
                () => cursor.classList.add("big")
            );

            element.addEventListener(
                "pointerleave",
                () => cursor.classList.remove("big")
            );

        });

    }


    /* ---------- Page Loaded ---------- */

    requestAnimationFrame(() => {

        document.body.classList.add("loaded");

    });

});
