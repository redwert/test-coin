const {join} = require('path')
const config = require('config')

const data = config.util.loadFileConfigs(join(__dirname, 'config'))
console.log({data})
//module.exports = config.util.loadFileConfigs(join(__dirname, 'config'))
