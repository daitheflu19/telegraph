// import .env variables
require('dotenv-safe').config({
  allowEmptyValues: true,
});

module.exports = {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 3000,
};
