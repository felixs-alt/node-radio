const express = require('express');
const { execRoot } = require("admina")
const { execSync } = require('node:child_process');
const path = require('path');

const app = express();
const PORT = 3000;

const upload = require('./upload');



app.post('/upload', upload.single('file'), async (req, res) => {
    res.end("Uploaded Audio")
})
app.post('/reset', (req, res) => {
    execRoot('./PiFmRds/src/pi_fm_rds',['-freq','97.0', '-audio', 'upload/music.wav'])
    res.end("Restarted Radio")
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,"index.html"));
    })
app.use(express.static('upload'))

app.listen(PORT,
    async function (err) {
        if (err) console.log(err);
        console.log("Server listening on PORT", PORT);
        execSync("make -C ./PiFmRds/src/")
        await execRoot('./PiFmRds/src/pi_fm_rds',['-freq','97.0', '-audio', 'upload/music.wav'])
    });
