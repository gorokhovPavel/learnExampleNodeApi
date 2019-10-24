const {formatResponse} = require('./../libs/formatResponse');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  try {

    let category = await Category.create({
      title: 'Category2',
      subcategories: [{
        title: 'Subcategory2',
      }],
    });

    let product = await Product.create({
      title: 'Product2',
      description: 'Description2',
      price: 10,
      category: category.id,
      subcategory: category.subcategories[0].id,
      images: ['image1'],
    });

    //Пытаемся передать данные в следующий стрим
    const productsArr = await Product.find();
    ctx.productsList = productsArr;
    await next(); 
  } catch(err) {
    throw err;
  }
};

module.exports.productList = async function productList(ctx, next) {
  //Подтягиваем данные из предыдущего стрима и передаем в следующий
  const {productsList} = ctx;
  ctx.body = {products: productsList.map((product) => formatResponse(product._doc))};
};

module.exports.productById = async function productById(ctx, next) {
  
  const {id} = ctx.params;
  try {
    new mongoose.Types.ObjectId(id);
  } catch (err) {
    ctx.status = 400;
    ctx.body = 'Bad id';
    return;
  }

  let productElem = await Product.findById(id);

  if (!productElem) {
    ctx.status = 404;
    ctx.body = 'Product not found!';
    return;
  }
  
  productElem = formatResponse(productElem._doc);
  ctx.body = { product : formatResponse(productElem) };

  await next();
};