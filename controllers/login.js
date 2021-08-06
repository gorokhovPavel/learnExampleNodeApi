const uuid = require('uuid/v4');
const passport = require('../libs/passport');
const User = require('../models/User');
const users = require('../fixtures/users');

module.exports.login = async function login(ctx, next) {
  
  await passport.authenticate('local', async (err, user, info) => {
    if (err) 
      throw err;
    if (!user) {
      ctx.status = 404;
      ctx.body = {error: info};
      return;
    }
    
    const token = uuid();
    ctx.body = {token};
  })(ctx, next);
};
