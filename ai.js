async function askRealAI() {

    const input =
    document.getElementById("q").value;

    const output =
    document.getElementById("ans");

    if(input.trim() === "") {

        output.innerText =
        "Type something first ⚡";

        return;
    }

    output.innerText =
    "🤖 Thinking...";

    const API_KEY =
    "AIzaSyC2diwYov95mvzaaZBwsQ-Dndd1co7U2Mk";

    try {

        const response =
        await fetch(

        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({

                contents: [

                {

                    parts: [

                    {

                        text: input

                    }

                    ]

                }

                ]

            })
        });

        const data =
        await response.json();

        console.log(data);

        if(data.candidates) {

            output.innerText =

            data.candidates[0]
            .content.parts[0].text;
        }

        else {

            output.innerText =
            "⚠ API ERROR";

            console.log(data);
        }
    }

    catch(error) {

        output.innerText =
        "⚠ SYSTEM ERROR";

        console.log(error);
    }
}
