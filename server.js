const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data for traffic data, emergency vehicles, and vehicle counts
let trafficData = [];
let emergencyVehicles = [];
let vehicleCounts = {};

// API endpoint to get traffic data
app.get('/api/traffic', (req, res) => {
    res.json(trafficData);
});

// API endpoint to add traffic data
app.post('/api/traffic', (req, res) => {
    const newTraffic = req.body;
    trafficData.push(newTraffic);
    res.status(201).json(newTraffic);
});

// API endpoint to get emergency vehicles
app.get('/api/emergency-vehicles', (req, res) => {
    res.json(emergencyVehicles);
});

// API endpoint to add emergency vehicle data
app.post('/api/emergency-vehicles', (req, res) => {
    const newEmergencyVehicle = req.body;
    emergencyVehicles.push(newEmergencyVehicle);
    res.status(201).json(newEmergencyVehicle);
});

// API endpoint to get vehicle counts
app.get('/api/vehicle-counts', (req, res) => {
    res.json(vehicleCounts);
});

// API endpoint to update vehicle counts
app.post('/api/vehicle-counts', (req, res) => {
    const { type, count } = req.body;
    vehicleCounts[type] = count;
    res.status(200).json({ message: 'Count updated', type, count });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});