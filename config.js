module.exports = {
    mongodb: {
      uri: (process.env.NODE_ENV === 'test')
        ? 'mongodb://localhost:27017/7-module-1-task'
        : 'mongodb://localhost:27017/any-shop',
    },
    crypto: {
      iterations: (process.env.NODE_ENV === 'test' ? 1 : 12000),
      length: 128,
      digest: 'sha512',
    },
  };
  