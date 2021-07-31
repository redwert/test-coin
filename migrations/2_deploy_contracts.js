const ERC20 = artifacts.require('ERC20')

const {token: {name, symbol, initSupply}, wallet: {address}} = require('../config.js')

module.exports = (deployer) => {
  deployer.deploy(ERC20, name, symbol, address, initSupply)
}
