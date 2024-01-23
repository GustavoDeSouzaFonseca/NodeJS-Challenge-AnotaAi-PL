import express from 'express';
import db from './config/mongo/mongodbConfig.js';
import routes from './routes/index.js';
import errorsMiddlewares from './middlewares/errorsMiddlewares.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});
const app = express();

routes(app);

app.use(notFoundMiddleware);
app.use(errorsMiddlewares);

export default app;
