#!/usr/bin/env node
/*
  Script: replace-product-images.js
  Purpose: Keep existing products but replace their proImg/psImg with images from
           public/images/boris/rental_equipment/chairs in order.
*/

const fs = require('fs');
const path = require('path');

function isImageFilename(filename) {
    const lower = filename.toLowerCase();
    return (
        lower.endsWith('.jpg') ||
        lower.endsWith('.jpeg') ||
        lower.endsWith('.png') ||
        lower.endsWith('.webp') ||
        lower.endsWith('.avif')
    );
}

function readJsonArray(filePath) {
    try {
        const raw = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw);
        if (!Array.isArray(data)) {
            throw new Error('JSON is not an array');
        }
        return data;
    } catch (err) {
        console.error(`Failed to read JSON array from ${filePath}: ${err.message}`);
        process.exit(1);
    }
}

function writeJson(filePath, data) {
    const json = JSON.stringify(data, null, 2) + '\n';
    fs.writeFileSync(filePath, json, 'utf8');
}

(function main() {
    const projectRoot = path.join(__dirname, '..');
    const chairsDir = path.join(projectRoot, 'public', 'images', 'boris', 'rental_equipment', 'chairs');
    const dataJsonPath = path.join(projectRoot, 'api', 'data.json');

    if (!fs.existsSync(chairsDir)) {
        console.error(`Chairs directory not found: ${chairsDir}`);
        console.error('Create it and add image files (jpg, jpeg, png, webp, avif).');
        process.exit(1);
    }

    if (!fs.existsSync(dataJsonPath)) {
        console.error(`Products data file not found: ${dataJsonPath}`);
        process.exit(1);
    }

    const images = fs
        .readdirSync(chairsDir)
        .filter(name => isImageFilename(name))
        // Consistent ordering so runs are deterministic
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    if (images.length === 0) {
        console.log('No images found in chairs directory. Nothing to replace.');
        process.exit(0);
    }

    const products = readJsonArray(dataJsonPath);

    const updated = products.map((product, index) => {
        const imgName = images[index % images.length];
        const imgPath = `/images/boris/rental_equipment/chairs/${imgName}`;
        return {
            ...product,
            proImg: imgPath,
            psImg: imgPath
        };
    });

    writeJson(dataJsonPath, updated);

    console.log(`Updated ${updated.length} products with ${images.length} chair images.`);
})();


