const {formatResponse} = require('./../libs/formatResponse');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  try {
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

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const {query} = ctx.request.query;

  let productModel = {};

  try {
    productModel = await require('./../models/Product');

    productModel.on('index', function(error) {
      if (error) {
        throw error;
      }
    });

    const productList = await productModel.find({
      $text: {
        $search: `\"${query}\"`,
        $language: 'ru',
      },
    });

    ctx.status = 200;
    ctx.body = { products: [...productList] };
  } catch (err) { 
    productModel.db.close();

    ctx.status = 500;
    ctx.body = 'BD error';

    throw err;
  };
};