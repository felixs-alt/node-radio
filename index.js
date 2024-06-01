
const express = require('express');
const app = express();
const PORT = 3000;

const { exec } = require('child_process');
const path = require('path');

const upload = require('./upload');

app.post('/upload', upload.single('file'), async (req, res) => {
    res.end("uploaded")
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
    })
app.use(express.static('upload'))

app.listen(PORT,
    function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
    });
