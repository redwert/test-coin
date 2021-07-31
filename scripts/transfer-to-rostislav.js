const {abi} = require('../build/contracts/ERC20.json')
const {wallet: {address}, contractAddress, receiver} = require('../config')

module.exports = async (callback) => {
  const decimals = web3.utils.toBN(18)
  const amount = web3.utils.toBN(100)
  const value = amount.mul(web3.utils.toBN(10).pow(decimals));

  const contract = new web3.eth.Contract(abi, contractAddress)

  const result = await contract
    .methods
    .transfer(receiver, value)
    .send({from: address})

  console.log({result})
  process.exit()
}

