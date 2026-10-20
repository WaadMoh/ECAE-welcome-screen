const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");

startBtn.addEventListener("click", async () => {

    statusText.innerHTML = "Button clicked";

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        statusText.innerHTML = "✅ Camera connected";

    } catch (error) {

        statusText.innerHTML =
            "❌ " + error.message;

        console.log(error);

    }

});
