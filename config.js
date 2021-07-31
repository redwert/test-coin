const {join} = require('path')
const dotenv = require('dotenv')
const config = require('config')

dotenv.config({path: join(__dirname, '.env')})

module.exports = config.util.loadFileConfigs(join(__dirname, 'config'))
