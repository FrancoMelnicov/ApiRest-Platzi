//aqui estaran asignadas todas los endpoints para productos

const express = require('express');
const { validatorHandler } = require('../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updaterProductSchema, deleteProductSchema } = require('../schemas/product.schema');
const router = express.Router();
const ProductService = require('./../services/product.services');
const service = new ProductService();

//los endpoins que son de forma específica siempre deben ir antes que los de forma dinámicas como los parametros por url
router.get('/', async(req, res) => {
  res.status(200).json(await service.list());
})

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async(req, res) => {
    const body = req.body;
    res.status(201).json(
      {
        message: "product created",
        data: await service.create(body)
      }
    )
})

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async(req, res, next) => {
    try {
      //params se envian como string
      const { id } = req.params;
      res.status(200).json(
        {
          message: "Product founded",
          data: await service.findOne(id)
        }
      );
    } catch (error) {
      next(error)
    }
})

//utilizado para hacer actualizaciones parciales de un elemento
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updaterProductSchema, 'body'),
  async(req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(
        {
          message: "product updated",
          data: await service.update(id, body)
        }
      )
    } catch (error) {
      next(error)
    }
})

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updaterProductSchema, 'body'),
  async(req, res) => {
    const { id } = req.params;
    const body = req.body;
    res.json(
      {
        message: "product updated",
        data: await service.update(id, body)
      }
    )
})

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async(req, res) => {
    const { id } = req.params;
    res.json(
      {
        message: "product elminated",
        id: await service.delete(id)
      }
    )
})

module.exports = router;
