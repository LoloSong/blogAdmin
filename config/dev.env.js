'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"https://lolosong.com/api/admin"'
  BASE_API: '"http://localhost:3000/api/admin"'
})
