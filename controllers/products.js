const {formatResponse} = require('./../libs/formatResponse');
const mongoose = require('mongoose');
const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  
  const {subcategory} = ctx.request.query;
  //if (!subcategory || subcategory.length === 0) return;
  
  ctx.productsList = await Product.find({subcategory});
};

module.exports.productList = async function productList(ctx, next) {
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

  let Product = {};
  let resp = {};

  try {
    Product = await require('./../models/Product');
    resp = await Product.findById(id);
  } catch (err) {
    await Product.db.close();
    throw err;
  }

  if (!resp) {
    ctx.status = 404;
    ctx.body = 'Product not found!';

    return;
  }

  ctx.body = {product: formatResponse(resp._doc)};

  await next();
};