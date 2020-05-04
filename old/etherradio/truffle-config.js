const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
    rinkeby: {
      provider: () => new HDWalletProvider('urban lens health pioneer honey cargo track shock knock prison stuff member', "https://rinkeby.infura.io/507b091b9fc14b08ae4bdc6d05b89ebc"),
      network_id: "4"
    },
  },
};