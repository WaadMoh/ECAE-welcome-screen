document.getElementById("startBtn").addEventListener("click", async () => {

    alert("Button Works!");

    try {

        const stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        alert("Camera Success!");

    } catch (err) {

        alert("Camera Error: " + err.message);

        console.log(err);

    }

});
