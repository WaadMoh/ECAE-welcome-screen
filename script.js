const video = document.getElementById("video");
const statusText = document.getElementById("status");
const message = document.getElementById("message");

let model;

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

        message.textContent = "Waiting for someone...";

        detectPerson();

    } catch (error) {

        statusText.textContent =
            "❌ Camera Error: " + error.message;

        console.error(error);
    }
}

async function detectPerson() {

    model = await blazeface.load();

        setInterval(async () => {
        
            const predictions = await model.estimateFaces(
                video,
                false
            );
        
            console.log(predictions);
        
            if (predictions.length > 0) {
        
                statusText.textContent =
                    "Face detected (" + predictions.length + ")";
        
                message.textContent =
                    "👋 Welcome to ECAE!";
        
            } else {
        
                statusText.textContent =
                    "No face detected";
        
                message.textContent =
                    "Waiting for someone...";
        
            }
        
        }, 1000);
}

window.addEventListener("load", startCamera);
