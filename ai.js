async function askRealAI() {

    let input =
    document.getElementById("q").value;

    let output =
    document.getElementById("ans");

    output.innerText =
    "🤖 Thinking... gimme some time bro! but remember iam more advance than any AI !😎😎☠️💀💀 ";

    const API_KEY =
    "AIzaSyC2diwYov95mvzaaZBwsQ-Dndd1co7U2Mk";

    const response =
    await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
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

    output.innerText =
    data.candidates[0]
    .content.parts[0]
    .text;
}
