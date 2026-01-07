const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const fs = require('fs');
const marked = require('marked');

const PORT = 3000;
app.use(cors());

// Dynamische README-HTML-Route direkt auf /
app.get('/', (req, res) => {
	fs.readFile(path.join(__dirname, 'README.md'), 'utf8', (err, data) => {
		if (err) return res.status(500).send('README not found');
		const html = marked.parse(data);
		res.send(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>README</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"></head><body class="bg-light"><div class="container py-5">${html}</div></body></html>`);
	});
});

// Statische Dateien erst nach den API-Routen einbinden
app.use(express.static(__dirname));

// Health-Route einbinden
const healthRouter = require('./routes/health');
app.use('/health', healthRouter);

// Strassenabschnitt-Route einbinden
const strassenabschnittRouter = require('./routes/strassenabschnitt');
app.use('/', strassenabschnittRouter);

// Baum-Route einbinden
const baumRouter = require('./routes/baum');
app.use('/', baumRouter);

app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});