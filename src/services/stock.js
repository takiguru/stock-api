const fetch = require('node-fetch')
const stockSchema = require('../schemas/stock')
const dayjs = require('dayjs')
const dateFormatString = 'YYYY-MM-DD'

module.exports.autoPrefix = '/stock'

module.exports = (fastify, opts, next) => {
  fastify.get(
    '/:symbol',
    stockSchema.currentPriceSchema,
    async (request, response) => {
      const symbol = request.params.symbol
      if (!symbol) {
        return response.code(400).send('No symbol specified')
      }
      let details
      try {
        const stockPrice = await fetch(
                    `${fastify.config.stockApiUrls.realtimePrice}${symbol}`
        )
        details = await stockPrice.json()
      } catch (err) {
        fastify.log.error(err)
        return response.code(500).send('Fetching stock price failed')
      }
      if (!details.symbol) {
        return response.code(404).send('Symbol not found')
      }
      return details
    }
  )

  fastify.get(
    '/:symbol/history/',
    stockSchema.historicalPriceSchema,
    async (request, response) => {
      const symbol = request.params.symbol
      if (!symbol) {
        return response.code(400).send('No symbol specified')
      }
      const startDate = dayjs(request.query['start-date'])
      if (!startDate.isValid()) {
        return response.code(401).send('Start date is not valid')
      }
      const endDate = dayjs(request.query['end-date'])
      if (!endDate.isValid()) {
        return response.code(401).send('End date is not valid')
      }
      let details
      try {
        const stockPrices = await fetch(
                    `${
                        fastify.config.stockApiUrls.historicalPrice
                    }${symbol}?from=${startDate.format(
                        dateFormatString
                    )}&to=${endDate.format(dateFormatString)}`
        )
        details = await stockPrices.json()
      } catch (err) {
        fastify.log.error(err)
        return response.code(500).send('Fetching stock prices failed')
      }
      if (!details.symbol) {
        return response.code(404).send('Symbol not found')
      }
      return details
    }
  )

  next()
}
