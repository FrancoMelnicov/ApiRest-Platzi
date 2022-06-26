//desde este index se controlaran todas las rutas para productos, es especifica el nombre de la ruta, en este caso producto y se llamará a los endpoints para productos
//todo para respetar el principio de una sola responsabilidad

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const express = require('express');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updaterProductSchema,
  getProductSchema,
  deleteProductSchema
} = require('../schemas/product.schema');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use(`/products`, productsRouter);
  router.use(`/users`, usersRouter);
  router.use(`/categories`, usersRouter);
}

module.exports = routerApi;
