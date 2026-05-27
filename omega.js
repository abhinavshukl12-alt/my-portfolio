const log =
document.getElementById("log");

/* system logger */

function systemLog(message) {

    const p =
    document.createElement("p");

    p.innerText =
    "> " + message;

    log.prepend(p);
}

/* random ambient logs */

const ambientMessages = [

"🌌 Deep space signal detected",

"🛰 Satellite orbit stable",

"⚡ Quantum reactor synchronized",

"🤖 AI neural expansion active",

"☄ Cosmic anomaly scanned",

"🔐 Classified systems secured",

"📡 Signal amplification complete",

"🌍 Planetary defense operational"

];

setInterval(() => {

    const randomMessage =

    ambientMessages[
    Math.floor(
    Math.random()
    *
    ambientMessages.length
    )
    ];

    systemLog(randomMessage);

}, 6000);

/* missile launch */

function launchMissile() {

    systemLog(
    "🚀 MISSILE LAUNCH SEQUENCE STARTED"
    );

    let count = 10;

    const countdown =
    setInterval(() => {

        systemLog(
        "⚠ T-" + count
        );

        count--;

        if(count < 0) {

            clearInterval(
            countdown
            );

            systemLog(
            "☄ TARGET IMPACT CONFIRMED"
            );

            flashScreen();
        }

    }, 1000);
}

/* red alert mode */

function redAlert() {

    document.body.classList.add(
    "red-alert"
    );

    systemLog(
    "🚨 GLOBAL RED ALERT ACTIVATED"
    );

    setTimeout(() => {

        document.body.classList.remove(
        "red-alert"
        );

    }, 6000);
}

/* flash effect */

function flashScreen() {

    const flash =
    document.createElement("div");

    flash.style.position =
    "fixed";

    flash.style.top = 0;

    flash.style.left = 0;

    flash.style.width = "100%";

    flash.style.height = "100%";

    flash.style.background =
    "rgba(255,255,255,0.7)";

    flash.style.zIndex = 99999;

    document.body.appendChild(
    flash
    );

    setTimeout(() => {

        flash.remove();

    }, 200);
}

/* startup logs */

setTimeout(() => {

    systemLog(
    "⚡ OMEGA CORE LINKED"
    );

}, 1000);

setTimeout(() => {

    systemLog(
    "🌌 INTERDIMENSIONAL GATE STABLE"
    );

}, 2500);

setTimeout(() => {

    systemLog(
    "🤖 AI ENTITY ONLINE"
    );

}, 4000);
