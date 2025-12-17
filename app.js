const express = require('express');
const path = require('path');
const app = express();

// Statische Dateien aus dem aktuellen Verzeichnis bereitstellen
app.use(express.static(__dirname));

// index.html auf / ausliefern
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});