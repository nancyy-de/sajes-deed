const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const handlebars = require('handlebars');
const puppeteer = require('puppeteer');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

const tplHtml = fs.readFileSync(path.join(__dirname, 'deed-template.html'), 'utf8');
const template = handlebars.compile(tplHtml);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/form.html'));
});

app.post('/generate', async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      father_name: req.body.father_name,
      property_size: req.body.property_size,
      sale_amount: req.body.sale_amount,
      date: req.body.date
    };
    const html = template(data);

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4' });
    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="sale-deed.pdf"',
      'Content-Length': pdfBuffer.length
    });
    return res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('PDF generation failed');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`👉 Running on http://localhost:${PORT}`));
