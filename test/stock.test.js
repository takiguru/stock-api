/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const { requestHelper } = require('./helper')
require('../src/server')

suite('/stock', () => {
  test('Current price without symbol', async () => {
    let response, error
    try {
      response = await requestHelper('/')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(400)
    }
  })

  test('Current price with bad symbol', async () => {
    let response, error
    try {
      response = await requestHelper('/BAD')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(404)
    }
  })
  test('Current price with good symbol', async () => {
    let response, error
    try {
      response = await requestHelper('/AAPL')
    } catch (err) { return err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(200)
      expect(response.body).to.have.property('symbol')
      expect(response.body).to.have.property('price')
    }
  })
  test('Historical price without start-date', async () => {
    let response, error
    try {
      response = await requestHelper('/AAPL/history/?start-date=2020-01-01')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(400)
    }
  })
  test('Historical price without end-date', async () => {
    let response, error
    try {
      response = await requestHelper('/AAPL/history/?end-date=2020-01-01')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(400)
    }
  })
  test('Historical price with bad start-date', async () => {
    let response, error
    try {
      response = await requestHelper('/AAPL/history/?start-date=none&end-date=2020-02-01')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(401)
    }
  })
  test('Historical price with bad end-date', async () => {
    let response, error
    try {
      response = await requestHelper('/AAPL/history/?start-date=2020-01-01&end-date=none')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(401)
    }
  })
  test('Historical price with good values', async () => {
    let response, error
    try {
      response = await requestHelper('/AAPL/history/?start-date=2020-01-01&end-date=2020-02-01')
    } catch (err) { error = err } finally {
      expect(error).to.be.undefined
      expect(response).to.have.status(200)
      expect(response.body).to.have.property('symbol')
      expect(response.body).to.have.property('historical')
    }
  })
})
