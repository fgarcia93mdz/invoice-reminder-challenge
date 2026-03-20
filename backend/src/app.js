// const express = require('express');
// const cors = require('cors');
// const seed = require('./db/seed');
// const invoicesRoutes = require('./routes/invoicesRoutes');
import express from 'express';
import cors from 'cors';
import seed from './db/seed.js';
import invoicesRoutes from './routes/invoicesRoutes.js';


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

seed();

app.use('/invoices', invoicesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
