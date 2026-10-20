const video = document.getElementById("video");
const statusText = document.getElementById("status");
const message = document.getElementById("message");

window.addEventListener("load", async () => {
    try {
        statusText.innerHTML = "Starting camera...";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;

        statusText.innerHTML = "✅ Camera Connected";
        message.innerHTML = "Waiting for someone...";

    } catch (error) {
        statusText.innerHTML = "❌ Camera Error: " + error.message;
        console.error(error);
    }
});
