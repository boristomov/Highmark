#!/usr/bin/env node
/*
  Script: duplicate-and-rename.js
  Tasks:
  1) Replace images for products titled: "Pearl Work Gown", "Wedding Cake", "Wedding Dress"
     with a duplicate of some other image (we pick the first chairs image).
  2) Rename ALL product titles to the base filename of their current proImg (no extension).
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
        if (!Array.isArray(data)) throw new Error('JSON is not an array');
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

    const products = readJsonArray(dataJsonPath);

    // Pick a source image from chairs directory
    let sourceImagePath = null;
    if (fs.existsSync(chairsDir)) {
        const imgs = fs
            .readdirSync(chairsDir)
            .filter(isImageFilename)
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        if (imgs.length > 0) {
            sourceImagePath = `/images/boris/rental_equipment/chairs/${imgs[0]}`;
        }
    }
    // Fallback: use the first product's image
    if (!sourceImagePath && products.length > 0) {
        sourceImagePath = products[0].proImg;
    }
    if (!sourceImagePath) {
        console.error('No source image available to duplicate.');
        process.exit(1);
    }

    const targets = new Set(['pearl work gown', 'wedding cake', 'wedding dress']);

    const updated = products.map(p => {
        const lowerTitle = String(p.title || '').toLowerCase();
        const product = { ...p };
        if (targets.has(lowerTitle)) {
            product.proImg = sourceImagePath;
            product.psImg = sourceImagePath;
        }
        // Rename title to image base filename (without extension)
        try {
            const base = path.parse(product.proImg || '').name;
            if (base) {
                product.title = base;
            }
        } catch (e) {
            // keep existing title on parse error
        }
        return product;
    });

    writeJson(dataJsonPath, updated);

    console.log('Updated product images for targets and renamed all titles to image filenames.');
})();


