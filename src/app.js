/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import dotenv from 'dotenv';
import db from './config/db/mongodbConfig.js';
import routes from './routes/index.js';
import errorsMiddlewares from './middlewares/errorsMiddlewares.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import sns from './config/aws/awsSNSConfig.js';

dotenv.config();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});
const app = express();

routes(app);

// Endpoint para verificar a conexão com o SNS
app.get('/check-sns', async (req, res) => {
  try {
    const result = await sns.listTopics().promise();
    res.status(200).json({ success: true, message: 'Conexão com o SNS bem-sucedida!', data: result });
  } catch (error) {
    console.error('Erro ao verificar a conexão com o SNS:', error);
    res.status(500).json({ success: false, message: 'Erro ao verificar a conexão com o SNS', error: error.message });
  }
});

app.use(notFoundMiddleware);
app.use(errorsMiddlewares);

export default app;
