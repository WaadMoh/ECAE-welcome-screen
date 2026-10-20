const video = document.getElementById("video");
const statusText = document.getElementById("status");
const message = document.getElementById("message");

const MODEL_URL =
    "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

let detectionStarted = false;
let faceFrames = 0;
let emptyFrames = 0;

async function loadFaceDetector() {
    statusText.textContent = "Loading face detector...";

    await faceapi.nets.tinyFaceDetector.loadFromUri(
        MODEL_URL
    );

    console.log("Face detector loaded");
}

async function startCamera() {
    statusText.textContent = "Starting camera...";

    const stream =
        await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "user",
                width: {
                    ideal: 640
                },
                height: {
                    ideal: 480
                }
            },
            audio: false
        });

    video.srcObject = stream;

    await video.play();

    statusText.textContent =
        "✅ Camera Connected";

    message.textContent =
        "Waiting for someone...";
}

async function detectFace() {
    if (detectionStarted) {
        return;
    }

    detectionStarted = true;

    statusText.textContent =
        "Camera connected • Detection active";

    while (detectionStarted) {
        try {
            if (
                video.readyState < 2 ||
                video.videoWidth === 0 ||
                video.videoHeight === 0
            ) {
                await wait(500);
                continue;
            }

            const options =
                new faceapi.TinyFaceDetectorOptions({
                    inputSize: 416,
                    scoreThreshold: 0.85
                });

            const detection =
                await faceapi.detectSingleFace(
                    video,
                    options
                );

            if (
                detection &&
                detection.score >= 0.85
            ) {
                const box = detection.box;

                const minimumFaceWidth =
                    video.videoWidth * 0.18;

                if (box.width >= minimumFaceWidth) {
                    faceFrames++;
                    emptyFrames = 0;
                } else {
                    emptyFrames++;
                    faceFrames = 0;
                }
            } else {
                emptyFrames++;
                faceFrames = 0;
            }

            if (faceFrames >= 3) {
                statusText.textContent =
                    "✅ Person Detected";

                message.textContent =
                    "👋 Welcome to ECAE!";
            }

            if (emptyFrames >= 3) {
                statusText.textContent =
                    "Camera connected • No person detected";

                message.textContent =
                    "Waiting for someone...";
            }

        } catch (error) {
            console.error(
                "Face detection error:",
                error
            );

            statusText.textContent =
                "Detection error. Camera is still connected.";
        }

        await wait(700);
    }
}

function wait(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}

async function startExperience() {
    try {
        await loadFaceDetector();
        await startCamera();
        detectFace();

    } catch (error) {
        console.error(error);

        statusText.textContent =
            "❌ Error: " + error.message;

        message.textContent =
            "Camera or face detection could not start.";
    }
}

window.addEventListener(
    "DOMContentLoaded",
    startExperience
);
