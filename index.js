const express = require('express');
const app = express();

const mime = require('mime-types');
const upload = require('express-fileupload');
const rand = require('random-id');

const auth = '';

app.use(upload({ preserveExtension: true, safeFileNames: true, limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.json());

app.get('/:image', async (req, res) => { 
    
    if (!require('fs').existsSync('images/' + req.params.image)) return res.send('Image not found.');
    res.sendFile(__dirname + '/images/' + req.params.image);

});

app.post('/image', async (req, res) => {

    if (!req.headers.authorization || req.headers.authorization !== auth) return res.sendStatus(401);

    const file = req.files.file;

    const id = rand(6, 'aA0');
    const ext = mime.extension(file.mimetype);

    const fileName = id + '.' + ext;
    file.mv('images/' + fileName);

    res.json({ file: fileName });

});

app.listen(3000);