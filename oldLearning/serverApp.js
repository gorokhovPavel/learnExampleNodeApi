const Koa = require('koa');
const Router = require('koa-router');
const {productsBySubcategory, productList, productById} = require('./controllers/products');
const {categoryList} = require('./controllers/categories');

const Category = require('./models/Category');
const Product = require('./models/Product');

const app = new Koa();
app.use(require('koa-bodyparser')());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = err.message;
      return;
    }
    if (err.name === 'ValidationError') {
      ctx.status = 400;
      ctx.body = Object.keys(err.errors).map(key => ({ [key]: err.errors[key].message }));
    } else {
      ctx.status = 500;
      ctx.body = 'Internal server error';
      console.error(err);
    }
  }
});

const router = new Router({prefix: '/api'});

router.get('/categories', categoryList);
router.get('/products', productsBySubcategory, productList);
router.get('/products/:id', productById);

router.post('/categories', async(ctx)=>{
  const category = await Category.create({
    title: ctx.request.body.title,
    subcategories: ctx.request.body.subcategories
  });
  ctx.body = category;
});

router.post('/products', async(ctx)=>{
  const products = await Product.create({
    title : ctx.request.body.title,
    images : ctx.request.body.images,
	  category : ctx.request.body.category,
    subcategory : ctx.request.body.subcategory,
    price : ctx.request.body.price,
    description : ctx.request.body.description
  });
  ctx.body = products;
});

app.use(router.routes());
module.exports = app;