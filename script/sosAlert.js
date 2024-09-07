// Get the SOS button element
const sosButton = document.getElementById('sosButton');
const locationStatus = document.getElementById('locationStatus');

// Emergency contacts (Example list of emails to send alerts)
const emergencyContacts = ["example1@contact.com", "example2@contact.com"];

// Event listener for the SOS button
sosButton.addEventListener('click', () => {
  sendEmergencyAlert();
  shareLocation();
});

// Function to send an emergency message
function sendEmergencyAlert() {
  const message = "SOS! I need help. Please check my location.";
  emergencyContacts.forEach(contact => {
    // For simplicity, we are logging to the console. In real applications, you'll integrate with a backend to send emails or texts.
    console.log(`Sending alert to: ${contact} with message: "${message}"`);
  });
  alert('Emergency alert sent to contacts.');
}

// Function to get and share the user's current location
function shareLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError);
  } else {
    locationStatus.innerText = "Geolocation is not supported by this browser.";
  }
}

// Success callback for geolocation
function showLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  locationStatus.innerText = `Your current location is Latitude: ${latitude}, Longitude: ${longitude}.`;
  
  // Send the location to emergency contacts (in practice, this would be done via backend services)
  emergencyContacts.forEach(contact => {
    console.log(`Sending location to: ${contact} - Latitude: ${latitude}, Longitude: ${longitude}`);
  });
  alert('Your location has been shared with your emergency contacts.');
}

// Error handling for geolocation
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationStatus.innerText = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationStatus.innerText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationStatus.innerText = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      locationStatus.innerText = "An unknown error occurred.";
      break;
  }
}
