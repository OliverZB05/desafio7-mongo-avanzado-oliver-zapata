import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.resolve(__dirname, 'products.json');

export function readProducts() {
    const data = fs.readFileSync(productsFilePath, {encoding: 'utf-8', flag: 'r'});
    return JSON.parse(data);
}

export function writeProducts(products) {
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
}