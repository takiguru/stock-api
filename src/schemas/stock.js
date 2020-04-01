const currentPriceSchema = {
  schema: {
    params: {
      type: 'object',
      required: ['symbol'],
      properties: {
        symbol: { type: 'string' }
      }
    },
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          symbol: { type: 'string' },
          price: { type: 'number' }
        }
      },
      400: {
        description: 'Invalid Symbol',
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      },
      404: {
        description: 'Symbol not found',
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      },
      500: {
        description: 'Get stock price failed',
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    }
  }
}

const historicalPriceSchema = {
  schema: {
    querystring: {
      type: 'object',
      required: ['start-date', 'end-date'],
      properties: {
        'start-date': { type: 'string' },
        'end-date': { type: 'string' }
      }
    }
  }
}

module.exports = { currentPriceSchema, historicalPriceSchema }
