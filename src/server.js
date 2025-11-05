import express from 'express';
import 'dotenv/config';
import errorHandler from './middlewares/errorHandler.js';
import albumRoute from './routes/albumRoute.js';
import songRoute from './routes/songRoute.js';

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());

app.use(albumRoute);
app.use(songRoute);

app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
