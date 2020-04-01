const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const config = require('config')
const serverConfig = config.get('server')
const host = `http://${serverConfig.host}:${serverConfig.port}`

const requestHelper = (url) => {
  return new Promise((resolve, reject) => {
    chai.request(host)
      .get(url)
      .then(res => resolve(res))
      .catch((err) => reject(err))
  })
}

module.exports = { requestHelper }
