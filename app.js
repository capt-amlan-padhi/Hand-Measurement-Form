const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit', async (req, res) => {
    const formData = req.body;

    // Launch Puppeteer to generate the PDF
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // Go to the form page and set the form data
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });
    await page.evaluate((formData) => {
        document.querySelector('#name').value = formData.name;
        document.querySelector(`input[name="gender"][value="${formData.gender}"]`).checked = true;
        document.querySelector('#age').value = formData.age;
        document.querySelector('#skin').value = formData.skin;
        document.querySelector(`input[name="position"][value="${formData.position}"]`).checked = true;
        document.querySelector('#date').value = formData.date;
        document.querySelector(`input[name="amputated_arm"][value="${formData.amputated_arm}"]`).checked = true;

        document.querySelector('input[name="a"]').value = formData.a;
        document.querySelector('input[name="b"]').value = formData.b;
        document.querySelector('input[name="c"]').value = formData.c;
        document.querySelector('input[name="d"]').value = formData.d;
        document.querySelector('input[name="e"]').value = formData.e;

        document.querySelector('input[name="a1"]').value = formData.a1;
        document.querySelector('input[name="b1"]').value = formData.b1;
        document.querySelector('input[name="c1"]').value = formData.c1;
        document.querySelector('input[name="d1"]').value = formData.d1;
        document.querySelector('input[name="e1"]').value = formData.e1;
        document.querySelector('input[name="f1"]').value = formData.f1;
        document.querySelector('input[name="a2"]').value = formData.a2;
        document.querySelector('input[name="b2"]').value = formData.b2;
        document.querySelector('input[name="c2"]').value = formData.c2;
        document.querySelector('input[name="d2"]').value = formData.d2;
        document.querySelector('input[name="e2"]').value = formData.e2;
        document.querySelector('input[name="f2"]').value = formData.f2;

        document.querySelector('input[name="g"]').value = formData.g;
        document.querySelector('input[name="h"]').value = formData.h;
        document.querySelector('input[name="i"]').value = formData.i;
        document.querySelector('input[name="j"]').value = formData.j;
        document.querySelector('input[name="k"]').value = formData.k;
        document.querySelector('input[name="l"]').value = formData.l;
        document.querySelector('input[name="p"]').value = formData.p;
        document.querySelector('input[name="q"]').value = formData.q;
        document.querySelector('input[name="r"]').value = formData.r;
        document.querySelector('input[name="s"]').value = formData.s;
        document.querySelector('input[name="t"]').value = formData.t;
        document.querySelector('input[name="u"]').value = formData.u;
        document.querySelector('input[name="v"]').value = formData.v;
        document.querySelector('input[name="w"]').value = formData.w;
        document.querySelector('input[name="x"]').value = formData.x;
        document.querySelector('input[name="y"]').value = formData.y;
        document.querySelector('input[name="z"]').value = formData.z;
        document.querySelector('input[name="x1"]').value = formData.x1;
        document.querySelector('input[name="x2"]').value = formData.x2;
        document.querySelector('input[name="x3"]').value = formData.x3;
        document.querySelector('input[name="x4"]').value = formData.x4;
        document.querySelector('input[name="x5"]').value = formData.x5;
        document.querySelector('input[name="x7"]').value = formData.x7;
        document.querySelector('input[name="x8"]').value = formData.x8;
    }, formData);

    // Generate the PDF
    const pdfPath = path.join(__dirname, 'output.pdf');
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true
    });

    await browser.close();

    res.sendFile(pdfPath);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
