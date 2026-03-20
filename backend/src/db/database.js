/** 
 * SACO LOS REQUIRE YA QUE NO APLICAN PARA ES MODULES
  const fs = require('fs');
  const path = require('path');
  const DB_PATH = path.join(__dirname, 'data.json');
 * 
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const modulePath = fileURLToPath(import.meta.url);
const baseDir = path.dirname(modulePath);
const dataFile = path.join(baseDir, 'data.json');


// function getAllInvoices() {
//   if (!fs.existsSync(DB_PATH)) {
//     fs.writeFileSync(DB_PATH, JSON.stringify([]));
//   }
//   const raw = fs.readFileSync(DB_PATH, 'utf-8');
//   return JSON.parse(raw);
// }

// function saveInvoices(invoices) {
//   fs.writeFileSync(DB_PATH, JSON.stringify(invoices, null, 2));
// }


//chequeo que exista el archivo, si no lo creo con un array vacío
function ensureDataFile() {
  if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
  }
}

export function getAllInvoices() {
  ensureDataFile();
  const rawData = fs.readFileSync(dataFile, 'utf-8');
  return JSON.parse(rawData);
}

export function saveInvoices(invoices) {
  fs.writeFileSync(dataFile, JSON.stringify(invoices, null, 2));
}

