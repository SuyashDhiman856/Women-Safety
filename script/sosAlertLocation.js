let spacebarCount = 0;
let lastSpacebarTime = 0;

// Function to trigger SOS alert (same as SOS button click)
function triggerSOS() {
  // Get device location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const timestamp = new Date(position.timestamp);

        // Send location to backend with multiple recipients
        fetch("http://localhost:5000/api/send-sos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            recipientEmail: "codebits7@gmail.com",
            recipientPhone: "+917417074864",
          }),
        })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          alert("SOS alert sent successfully!");
          document.getElementById("otherInfo").textContent = "SOS alert sent successfully!";
        })
        .catch((error) => {
          console.error("Error:", error);
        //   alert("Failed to send SOS alert: " + error.message);
        //   document.getElementById("otherInfo").textContent = "Failed to send SOS alert.";
        });
      },
      function (error) {
        console.error("Error getting location:", error);
        alert("Unable to get location.");
        document.getElementById("otherInfo").textContent = "Unable to get location.";
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
    document.getElementById("otherInfo").textContent = "Geolocation is not supported.";
  }

  // Start camera recording and send the video via email
  startRecordingAndSendEmail();

  // start audio recording

  recordAudio()
}

// Function to handle video recording and sending via email
async function startRecordingAndSendEmail() {
  try {
    let stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    let mediaRecorder = new MediaRecorder(stream);
    let chunks = [];

    mediaRecorder.ondataavailable = function (event) {
      chunks.push(event.data);
    };

    mediaRecorder.onstop = function () {
      let blob = new Blob(chunks, { type: "video/webm" });
      let videoUrl = URL.createObjectURL(blob);

      // Send the video blob via email
      sendEmailWithVideo(blob);
    };

    mediaRecorder.start();

    // Stop recording after 10 seconds
    setTimeout(() => {
      mediaRecorder.stop(); // Stop recording after 10 seconds
      stream.getTracks().forEach(track => track.stop()); // Stop all camera tracks
    }, 10000); // Records for 10 seconds
  } catch (error) {
    console.error("Error accessing media devices:", error);
  }
}

// Function to send the video via email
function sendEmailWithVideo(blob) {
  let formData = new FormData();
  formData.append("video", blob, "sos-video.webm");

  fetch("/send-video", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => console.log("Video sent successfully:", data))
    .catch((error) => console.error("Error:", error));
}

function recordAudio() {
    let mediaRecorder;
    let audioChunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = function (event) {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = function () {
          let audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          sendAudioEmail(audioBlob);
        };

        // Start recording for 10 seconds
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop(); // Stop recording after 10 seconds
          stream.getTracks().forEach(track => track.stop()); // Stop all camera tracks
        }, 10000); // Record for 10 seconds
      });

    function sendAudioEmail(audioBlob) {
      // Use FormData to send the audioBlob to your server
      let formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      fetch("/api/send-audio", {
        method: "POST",
        body: formData,
      }).then((response) => {
        if (response.ok) {
          console.log("Audio sent successfully!");
        } else {
          console.error("Error sending audio.");
        }
      });
    }
  }

// Detect spacebar presses and trigger SOS after 3 presses
document.addEventListener("keydown", function (event) {
  const SPACEBAR_KEY = 32;
  const MAX_TIME_BETWEEN_PRESSES = 1000; // Maximum allowed time between presses (1 second)

  if (event.keyCode === SPACEBAR_KEY) {
    const currentTime = new Date().getTime();
    
    if (currentTime - lastSpacebarTime > MAX_TIME_BETWEEN_PRESSES) {
      spacebarCount = 0; // Reset count if too much time has passed
    }

    lastSpacebarTime = currentTime;
    spacebarCount++;

    if (spacebarCount === 3) {
      triggerSOS(); // Trigger SOS function after 3 spacebar presses
      spacebarCount = 0; // Reset count after SOS is triggered
    }
  } else {
    spacebarCount = 0; // Reset count if a non-spacebar key is pressed
  }
});

// SOS button click event listener
// document.getElementById("sosButton").addEventListener("click", function () {
//   triggerSOS();
// });
