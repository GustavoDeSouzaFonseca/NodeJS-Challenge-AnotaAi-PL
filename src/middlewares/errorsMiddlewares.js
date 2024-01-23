import ErrorBase from '../errors/errorBase.js';

// eslint-disable-next-line no-unused-vars
const errorsMiddlewares = (error, req, res, next) => {
  if (error instanceof ErrorBase) {
    error.sendAnswer(res);
  } else {
    new ErrorBase().sendAnswer(res);
  }
};

export default errorsMiddlewares;
