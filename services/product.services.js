const faker = require('faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor(){
    this.products = [];
    this.generateProducts();
  }

  //utilizado para usar faker los datos se cargaran de forma dinámica en memoria
  generateProducts(){
    const limit = 100;
    while(this.products.length < limit){
      this.products.push(
        {
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          blocked: faker.datatype.boolean(),
        }
      )
    }
  }

  create(data){
    const product = {
      id: faker.datatype.uuid(),
      //concatenamos los datos provenientes de la req
      ...data
    }
    this.products.push(product);
    return product;
  }

  list(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 2000)
    })
  }

  findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound("Product not found");
    }
    if(product.blocked){
      throw boom.conflict("Product is block");
    }
    return product;
  }

  update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound("Product not found");
    }
    const product = this.products[index];
    //hacemos persistir aquellos datos que no sufren cambios y reemplazamos aquellos que si por nuevos
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductService;
