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
       return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/015bf16116de4e21af477e6e44f3d206");
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

