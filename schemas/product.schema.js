const joi = require('joi');

const id = joi.string().uuid();
const name = joi.string().min(5).max(20);
const price = joi.number().integer().min(10);
const image = joi.string().uri();

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

const updaterProductSchema = joi.object({
  name: name,
  price: price,
  image: image
})

const getProductSchema = joi.object({
  id: id.required()
})

const deleteProductSchema = joi.object({
  id: id.required()
})

module.exports = {createProductSchema, updaterProductSchema, getProductSchema, deleteProductSchema}
