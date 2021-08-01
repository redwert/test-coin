# test-coin

## Setup

- Run `npm i`
- Run `npm i ganahe-cli -g` if `ganahe-cli` is not installed
- Run `npm i truffle -g` if `truffle` in not installed
- Copy `config/example.local-development.json` to `config/local-development.json` and change needed overriden values
- Add `.env` file and add specify `NODE_ENV`, configs will be applied according to NODE_ENV (More info https://www.npmjs.com/package/config
  and https://github.com/lorenwest/node-config/wiki/Configuration-Files)

## Test
- Run ganache `npm run ganache` if not running
- Run `npm run test`
- To check coverage run `npm run coverage`
