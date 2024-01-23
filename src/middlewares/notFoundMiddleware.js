import NotFound from '../errors/notFound.js';

const notFoundMiddleware = (req, res, next) => {
  const error404 = new NotFound();
  next(error404);
};

export default notFoundMiddleware;
