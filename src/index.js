import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import colorRouter from './routes/colorRoutes.js';

import './database/database.js';

// Inicio de aplicacion
const app = express();

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(colorRouter);

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
