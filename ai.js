async function askRealAI() {

    const input =
    document.getElementById("q").value;

    const output =
    document.getElementById("ans");

    if(input.trim() === "") {

        output.innerText =
        "⚠ Type something first";

        return;
    }

    output.innerText =
    "🤖 CLAUDE AI THINKING...";

    const API_KEY =
    "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";

    try {

        const response =
        await fetch(

        "https://api.anthropic.com/v1/messages",

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json",

                "x-api-key":
                API_KEY,

                "anthropic-version":
                "2023-06-01"
            },

            body: JSON.stringify({

                model:
                "claude-3-haiku-20240307",

                max_tokens: 300,

                messages: [

                {

                    role: "user",

                    content: input
                }

                ]
            })
        });

        const data =
        await response.json();

        console.log(data);

        if(data.content) {

            output.innerText =

            data.content[0].text;
        }

        else if(data.error) {

            output.innerText =

            "⚠ " +
            data.error.message;
        }

        else {

            output.innerText =
            "⚠ No response";
        }

    }

    catch(error) {

        console.log(error);

        output.innerText =
        "⚠ System Error";
    }
}
