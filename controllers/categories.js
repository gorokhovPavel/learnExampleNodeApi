const Category = require('../models/Category');
const { formatResponse } = require('../libs/formatResponse');

module.exports.categoryList = async function categoryList(ctx, next) {
  const response = await Category.find();
  const categoryList = response.map((model) => {
    model = formatResponse(model._doc);
    model.subcategories = model.subcategories.map((subcategory) => {
      return formatResponse(subcategory._doc);
    });
    return model;
  });

  ctx.body = { catrgories : categoryList };
}