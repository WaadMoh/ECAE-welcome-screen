const video = document.getElementById("video");
const status = document.getElementById("status");
const message = document.getElementById("message");

let greeted = false;

const messages = [
    "👋 Welcome to ECAE",
    "🌟 Have a wonderful day",
    "😊 Great to see you today",
    "🎓 Welcome to Emirates College for Advanced Education"
];

async function startCamera() {

    const stream = await navigator.mediaDevices.getUserMedia({
        video:true
    });

    video.srcObject = stream;
}

async function runDetection() {

    const model = await blazeface.load();

    setInterval(async () => {

        const predictions =
            await model.estimateFaces(video,false);

        if(predictions.length > 0 
