const lanes = ["north", "south", "east", "west"];
let currentIndex = 0;
let intervalId = null;

function setLight(activeLane) {
  lanes.forEach(lane => {
    const light = document.getElementById(`light-${lane}`);
    const laneBox = document.getElementById(`lane-${lane}`);

    if (lane === activeLane) {
      light.classList.add("green");
      light.classList.remove("red");
      laneBox.classList.add("active");
    } else {
      light.classList.remove("green");
      light.classList.add("red");
      laneBox.classList.remove("active");
    }
  });
}

function startNormalCycle() {
  document.getElementById("emergencyBanner").style.display = "none";
  clearInterval(intervalId);
  currentIndex = 0;
  setLight(lanes[currentIndex]);
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % lanes.length;
    setLight(lanes[currentIndex]);
  }, 4000);
}

function simulateEmergency(lane) {
  clearInterval(intervalId);
  document.getElementById("emergencyBanner").style.display = "block";
  setLight(lane);
  console.log(`🚨 Emergency detected at ${lane.toUpperCase()}! Priority granted.`);
}

window.onload = startNormalCycle;
