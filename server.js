const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve Chart.js from node_modules
app.get('/chart.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'chart.js', 'dist', 'chart.umd.js'));
});

// Serve the dashboard HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'georgia_real_estate_dashboard.html'));
});

// Serve static files
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`  Georgia Real Estate Dashboard`);
    console.log(`  http://localhost:${PORT}`);
    console.log(`========================================\n`);
});
