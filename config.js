const {join} = require('path')
const config = require('config')

module.exports = config.util.loadFileConfigs(join(__dirname, 'config'))
