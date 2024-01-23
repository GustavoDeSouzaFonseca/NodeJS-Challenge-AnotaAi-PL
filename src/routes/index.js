import express from 'express';
import categories from './categoryRoute.js';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Product-catalogy'));

  app.use(
    express.json(),
    categories,
  );
};

export default routes;
