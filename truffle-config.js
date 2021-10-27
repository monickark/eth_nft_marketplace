const HDWalletProvider = require("@truffle/hdwallet-provider");
var mnemonic = "rely viable waste novel ice festival wrap round effort improve endless strong";
module.exports = {
 networks: {
  development: {
   host: "127.0.0.1",
   port: 8545,
   network_id: "*"
  },
  rinkeby: {
      provider: function() { 
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/f02d07f5c1494736b277cbcc3bacf2ca");
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
  },
 }, 
 compilers: {
  solc: {
    version: "^0.8.3"
  }
}
};

