import express from 'express';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('Product-catalogy'));

  app.use(
    express.json(),
  );
};

export default routes;
