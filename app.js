const express = require('express');
const path = require('path');
const app = express();

// Health-Route einbinden
const healthRouter = require('./routes/health');
app.use('/health', healthRouter);

// RoadSection-Route einbinden
const roadSectionRouter = require('./routes/roadSection');
app.use('/', roadSectionRouter);

// Statische Dateien und index.html erst nach den API-Routen einbinden
app.use(express.static(__dirname));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});