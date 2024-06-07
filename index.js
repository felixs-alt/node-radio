const express = require('express');
const path = require('path');
const multer  = require('multer')
const { Readable } = require('stream');
var radio = require('nodefm-rpi');

const app = express();
const PORT = 3000;

const storage = multer.memoryStorage()
const upload = multer({ storage: storage, limits : {fileSize : 100000000}})

var emitter = new radio("87");

function bufferToStream(binary) {

    const readableInstanceStream = new Readable({
      read() {
        this.push(binary);
        this.push(null);
      }
    });

    return readableInstanceStream;
}
app.post('/upload', upload.single('file'), async (req, res) => {
    try {   
        var radioStream = emitter.start();
        bufferToStream(req.file.buffer).pipe(radioStream);
    } catch (error) {return res.end(error.message)}
    res.send("Finished Uploading")
})
app.get('/uploadurl', async (req, res) => {
    console.log(req.query.url)
    try {
        const readableStream = await fetch(req.query.url).then(r => Readable.fromWeb(r.body));
        var radioStream = emitter.start();
        readableStream.pipe(radioStream)
    } catch (error) {return res.end(error.message)}
    res.send("Finished Uploading")
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
