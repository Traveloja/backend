// open folder images
// open folder text
const budaya  = require( './text/budaya');
const makanan = require('./text/makanan');

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Server success installed');
});
console.log(budaya);
// Endpoint to list images by province and category
app.get('/images/:province/:category', (req, res) => {
    const { province, category } = req.params;
    console.log(req.params)
    const imagesDir = path.join(__dirname, 'images', province, category);

    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        return res.status(500).send('Unable to scan directory: ' + err);
      }
      // Filter out only image files
      const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
      res.json(imageFiles);
      console.log(imageFiles)
    });
  });
// Endpoint to list text by province and category in budaya js
app.get('/budaya/:province/:category', (req, res) => {
    const { province, category } = req.params;
  
    // Check if the province and category exist
    if (budaya.budaya_indonesia[province] && budaya.budaya_indonesia[province][category]) {
      res.json(budaya.budaya_indonesia[province][category]);
    } else {
      res.status(404).json({ error: 'Province or category not found' });
    }
  });
app.get('/budaya/:province', (req, res) => {
    const { province } = req.params;
    // Check if the province and category exist
    if (budaya.budaya_indonesia[province]) {
      res.json(budaya.budaya_indonesia[province]);
    } else {
      res.status(404).json({ error: 'Province or category not found' });
    }
  });
  
app.get('/makanan/:province', (req, res) => {
    const { province } = req.params;
    const provinceData = makanan[province];
  
    if (provinceData) {
      res.json(provinceData);
    } else {
      res.status(404).json({ message: 'Province not found' });
    }
  });

app.get('/makanan/', (req, res) => {
    const { province } = req.params;
    const provinceData = makanan;
  
    if (provinceData) {
      res.json(provinceData);
    } else {
      res.status(404).json({ message: 'Province not found' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

