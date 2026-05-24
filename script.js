function toggleTheme() {

    document.body.classList.toggle("light");
}

/* fake visitors */
document.getElementById("v").innerText =
Math.floor(Math.random() * 900) + 100;

/* AI system */

function askAI() {

    let q =
    document.getElementById("q")
    .value.toLowerCase();

    let ans =
    document.getElementById("ans");

    ans.innerText =
    "Thinking... 🤖";

    setTimeout(() => {

        if(q.includes("skills")) {

            ans.innerText =
            "HTML, CSS, JS, Python, Editing 🚀";
        }

        else if(q.includes("project")) {

            ans.innerText =
            "Portfolio, Calculator, To-Do App 🌐";
        }

        else if(q.includes("who")) {

            ans.innerText =
            "Abhinav — Developer & Creator ⚡";
        }

        else if(q.includes("future")) {

            ans.innerText =
            "Building a full developer identity system 🌌";
        }

        else {

            ans.innerText =
            "Ask about skills, projects, or future ⚡";
        }

    }, 500);
}
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
