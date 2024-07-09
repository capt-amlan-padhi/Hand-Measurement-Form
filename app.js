const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const pdf = require('pdf-creator-node');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

function base64Encode(file) {
    const bitmap = fs.readFileSync(file);
    return new Buffer.from(bitmap).toString('base64');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', (req, res) => {
    const formData = req.body;
    formData.base64NormalHand = base64Encode('public/normal_hand_measurements.png');
    formData.base64Wrist = base64Encode('public/wrist_measurements.png');
    formData.base64Transradial = base64Encode('public/transradial_measurements.png');
    formData.base64Transhumeral = base64Encode('public/transhumeral_measurements.png');

    const htmlTemplate = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

    const options = {
        format: 'A4',
        orientation: 'portrait',
        border: '10mm'
    };

    const document = {
        html: htmlTemplate,
        data: formData,
        path: './output.pdf',
        type: ''
    };

    pdf.create(document, options)
        .then(() => {
            res.sendFile(path.join(__dirname, 'output.pdf'));
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('An error occurred while generating the PDF.');
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
