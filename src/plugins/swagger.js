const internals = require('fastify-swagger')
const packageDetails = require('../../package')

const options = (fastify) => {
  return {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Stock Price API',
        description: 'Stock price api for coding test',
        version: packageDetails.version
      }
    },
    exposeRoute: fastify.config.plugins.enableSwaggerEndpoint
  }
}

module.exports = { internals, options }
