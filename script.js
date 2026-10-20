const video = document.getElementById("video");
const statusText = document.getElementById("status");
const message = document.getElementById("message");

async function startCamera() {
    try {

        statusText.textContent = "Starting camera...";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });

        video.srcObject = stream;

        await video.play();

        statusText.textContent = "✅ Camera Connected";

        message.textContent = "Loading detection...";

    } catch (error) {

        statusText.textContent =
            "❌ Camera Error: " + error.message;

        console.error(error);
    }
}

window.addEventListener("load", startCamera);
