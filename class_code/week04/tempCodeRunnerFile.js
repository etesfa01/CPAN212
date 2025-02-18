const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/fetch', (req, res) => {
    res.send('This is the /fetch route');
});

app.post('/save', (req, res) => {
    res.send('This is the /save route');
});

app.delete('/delete', (req, res) => {
    res.send('This is the /delete route');
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});