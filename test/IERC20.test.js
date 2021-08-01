const {BN, expectRevert} = require('@openzeppelin/test-helpers')
const {expect} = require('chai')

const ERC20 = artifacts.require('ERC20')

contract('ERC20', function (accounts) {
  const name = 'Test token'
  const symbol = 'TT'

  const ownerSupply = new BN(1000)
  const contractOwnerAddress = accounts[0]

  beforeEach(async function () {
    this.token = await ERC20.new(name, symbol, contractOwnerAddress, ownerSupply)
  })

  describe('check deployment', function () {
    it('has a name', async function () {
      expect(await this.token.name()).to.equal(name)
    })

    it('has a symbol', async function () {
      expect(await this.token.symbol()).to.equal(symbol)
    })

    it('has 18 decimals', async function () {
      expect(await this.token.decimals()).to.be.bignumber.equal('18')
    })

    it('retrieve returns a value previously stored', async function () {
      expect(await this.token.totalSupply()).to.be.bignumber.equal(ownerSupply)
    })

    it('assigns the initial total supply to the creator', async function () {
      expect(await this.token.balanceOf(contractOwnerAddress)).to.be.bignumber.equal(ownerSupply)
    })
  })

  describe('transfer', function () {
    it('success result', async function () {
      const amount = new BN(1)
      await this.token.transfer(accounts[1], amount)

      expect(await this.token.balanceOf(contractOwnerAddress)).to.be.bignumber.equal(ownerSupply.sub(amount))
      expect(await this.token.balanceOf(accounts[1])).to.be.bignumber.equal(amount)
    })
  })

  describe('allowance', function () {
    it('success result', async function () {
      const result = await this.token.allowance(contractOwnerAddress, accounts[1])
      expect(result.words[0]).to.equal(0)
    })
  })

  describe('increaseAllowance', function () {
    it('success result', async function () {
      const result1 = await this.token.allowance(contractOwnerAddress, accounts[1])
      expect(result1.words[0]).to.equal(0)

      await this.token.increaseAllowance(accounts[1], new BN(10), {from: contractOwnerAddress})
      const result2 = await this.token.allowance(contractOwnerAddress, accounts[1])
      expect(result2.words[0]).to.equal(10)
    })
  })

  describe('decreaseAllowance', function () {
    it('success result', async function () {
      await this.token.increaseAllowance(accounts[1], new BN(10), {from: contractOwnerAddress})
      await this.token.decreaseAllowance(accounts[1], new BN(5), {from: contractOwnerAddress})

      const result = await this.token.allowance(contractOwnerAddress, accounts[1])
      expect(result.words[0]).to.equal(5)
    })
  })

  describe('approve', function () {
    it('success result', async function () {
      await this.token.approve(accounts[1], new BN(10), {from: contractOwnerAddress})

      const result = await this.token.allowance(contractOwnerAddress, accounts[1])
      expect(result.words[0]).to.equal(10)
    })
  })

  describe('transferFrom', function () {
    it('should fails if no allowance', async function () {
      await expectRevert(
        this.token.transferFrom(contractOwnerAddress, accounts[1], new BN(10), {from: contractOwnerAddress}),
        'ERC20: transfer amount exceeds allowance -- Reason given: ERC20: transfer amount exceeds allowance.'
      )
    })

    it('success result', async function () {
      const amount = new BN(10)
      await this.token.increaseAllowance(contractOwnerAddress, new BN(10), {from: contractOwnerAddress})

      await this.token.transferFrom(contractOwnerAddress, accounts[1], new BN(10), {from: contractOwnerAddress})

      expect(await this.token.balanceOf(contractOwnerAddress)).to.be.bignumber.equal(ownerSupply.sub(amount))
      expect(await this.token.balanceOf(accounts[1])).to.be.bignumber.equal(amount)
    })
  })
})
