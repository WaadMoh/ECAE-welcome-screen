const video = document.getElementById("video");
const statusText = document.getElementById("status");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", async () => {
    try {
        statusText.innerHTML = "Starting camera...";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;

        video.style.display = "block";

        statusText.innerHTML = "✅ Camera Connected";
        message.innerHTML = "👋 Welcome to ECAE";

    } catch (error) {
        statusText.innerHTML = "❌ Camera Error: " + error.message;
        console.error(error);
    }
});
