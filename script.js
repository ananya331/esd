// 📍 Initialize Leaflet Map
const map = L.map("map").setView([22.5726, 88.3639], 14);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

// 🚦 Signal Control
const lanes = ["north", "east", "south", "west"];
let currentLaneIndex = 0;
let signalCycle;
let vehicleCount = 0;

// Simulate normal traffic cycle
function startNormalCycle() {
  signalCycle = setInterval(() => {
    setLight(lanes[currentLaneIndex]);
    currentLaneIndex = (currentLaneIndex + 1) % lanes.length;
  }, 7000);
}

// Set the active green light
function setLight(activeLane) {
  lanes.forEach((lane) => {
    const light = document.getElementById(`light-${lane}`);
    const laneDiv = document.getElementById(`lane-${lane}`);
    if (lane === activeLane) {
      light.classList.remove("red");
      light.classList.add("green");
      laneDiv.classList.add("active");
      document.getElementById("currentGreen").innerText = lane.toUpperCase();
    } else {
      light.classList.remove("green");
      light.classList.add("red");
      laneDiv.classList.remove("active");
    }
  });

  // Update simulated vehicle count
  vehicleCount = Math.floor(Math.random() * 50) + 10;
  document.getElementById("vehicleCount").innerText = vehicleCount;
}

// 🚑 Emergency Vehicle Tracking
let ambulanceMarker;
let ambulanceCoords = [
  [22.570, 88.360],
  [22.571, 88.362],
  [22.572, 88.364],
  [22.573, 88.366],
  [22.574, 88.368]
];
let ambulanceIndex = 0;

function startEmergencyTracking() {
  document.getElementById("emergencyBanner").style.display = "block";
  document.getElementById("emergencyStatus").innerText = "Active";

  if (ambulanceMarker) map.removeLayer(ambulanceMarker);

  ambulanceMarker = L.marker(ambulanceCoords[ambulanceIndex], { title: "Ambulance" }).addTo(map);

  let emergencyInterval = setInterval(() => {
    ambulanceIndex++;
    if (ambulanceIndex >= ambulanceCoords.length) {
      clearInterval(emergencyInterval);
      document.getElementById("emergencyBanner").style.display = "none";
      document.getElementById("emergencyStatus").innerText = "Inactive";
      map.removeLayer(ambulanceMarker);
      startNormalCycle();
      return;
    }

    ambulanceMarker.setLatLng(ambulanceCoords[ambulanceIndex]);

    // Highlight signal for emergency direction
    setLight("north"); // Assume north is the priority direction
    document.getElementById("eta").innerText = `${5 - ambulanceIndex} sec`;
  }, 1000);
}

// 🧑‍💼 Admin Functions
function manualSetLight(lane) {
  clearInterval(signalCycle);
  setLight(lane);
}

function toggleEmergency() {
  ambulanceIndex = 0;
  clearInterval(signalCycle);
  startEmergencyTracking();
}

function resetSystem() {
  ambulanceIndex = ambulanceCoords.length;
  document.getElementById("emergencyBanner").style.display = "none";
  document.getElementById("emergencyStatus").innerText = "Inactive";
  document.getElementById("eta").innerText = "N/A";
  startNormalCycle();
}

// 🌡️ Traffic Heatmap
let heatLayer;

function initHeatmap() {
  const initialPoints = generateRandomTrafficPoints();
  heatLayer = L.heatLayer(initialPoints, {
    radius: 25,
    blur: 15,
    maxZoom: 17,
    gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' }
  }).addTo(map);

  setInterval(() => {
    const newPoints = generateRandomTrafficPoints();
    heatLayer.setLatLngs(newPoints);
  }, 5000); // Update every 5 seconds
}

function generateRandomTrafficPoints() {
  const baseLat = 22.572;
  const baseLng = 88.363;
  let points = [];

  for (let i = 0; i < 15; i++) {
    const lat = baseLat + Math.random() * 0.01;
    const lng = baseLng + Math.random() * 0.01;
    const intensity = Math.random(); // 0 to 1
    points.push([lat, lng, intensity]);
  }

  return points;
}

// 🚀 On Load
window.onload = () => {
  startNormalCycle();
  initHeatmap();
};
