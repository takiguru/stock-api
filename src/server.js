const fastify = require('fastify')
const plugins = require('./plugins')
const config = require('config')
const stockService = require('./services/stock')
const initialize = async () => {
  try {
    const serverConfig = config.get('server')
    const server = fastify({ logger: serverConfig.logger })
    server.decorate('config', serverConfig)
    plugins.register(server)
    server.register(stockService)
    await server.listen(server.config.port, server.config.host)
    return server
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
module.exports = initialize()
