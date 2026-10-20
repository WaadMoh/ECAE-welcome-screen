const video = document.getElementById("video");
const statusText = document.getElementById("status");
const message = document.getElementById("message");
startBtn.addEventListener("click", () => {
    alert("Button works");
});
let greeted = false;

const greetings = [
    "👋 Welcome to ECAE",
    "🎓 Welcome Student",
    "😊 Great To See You Today",
    "🌟 Have A Wonderful Day",
    "👋 مرحباً بكم في كلية الإمارات للتطوير التربوي"
];

async function startCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        video.srcObject = stream;

        statusText.innerHTML = "✅ Camera Connected";

        detectFace();

    } catch (error) {

        statusText.innerHTML = "❌ Camera Access Denied";

        console.error(error);
    }
}

async function detectFace() {

    const model = await blazeface.load();

    statusText.innerHTML = "✅ Waiting For Visitor";

    setInterval(async () => {

        const predictions =
            await model.estimateFaces(video, false);

        if (predictions.length > 0 && !greeted) {

            greeted = true;

            statusText.innerHTML = "👤 Visitor Detected";

            const randomGreeting =
                greetings[
                    Math.floor(Math.random() * greetings.length)
                ];

            message.innerHTML = randomGreeting;

            setTimeout(() => {

                message.innerHTML = "";

                statusText.innerHTML =
                    "✅ Waiting For Visitor";

                greeted = false;

            }, 5000);
        }

    }, 1000);
}

startBtn.addEventListener("click", startCamera);
