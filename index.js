const express = require('express');
const path = require('path');
var radio = require('nodefm-rpi');

const app = express();
const PORT = 80;

var emitter = new radio("97.0");
var radioStream = emitter.start();

const upload = require('./upload');



app.post('/upload', async (req, res) => {
    res.end("Uploaded Audio")
    var stream = new multipart.Stream(req).pipe(radioStream);
})
app.post('/reset', (req, res) => {
    emitter.cleanGpio(7);
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
    });
