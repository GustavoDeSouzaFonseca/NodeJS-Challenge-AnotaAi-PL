/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import db from './config/db/mongodbConfig.js';
import routes from './routes/index.js';
import errorsMiddlewares from './middlewares/errorsMiddlewares.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';

dotenv.config();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});
const app = express();

routes(app);

app.use(notFoundMiddleware);
app.use(errorsMiddlewares);

export default app;
