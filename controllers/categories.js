const Category = require('../models/Category');

module.exports.categoryList = async function categoryList(ctx, next) {
  
  const response = await Category.find();
  const categoryArr = response.map(x=>{
    return x;
  })
  ctx.body = {categories : categoriesArr};
};
