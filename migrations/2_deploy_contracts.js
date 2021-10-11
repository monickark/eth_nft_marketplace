const nftMarket = artifacts.require('NFTMarket');
const nft = artifacts.require('NFT');

module.exports = async function (deployer, addresses) {
  await deployer.deploy(nftMarket);
  await nftMarket.deployed();
  console.log("nftMarket deployed to:", nftMarket.address);
  
  await deployer.deploy(nft,nftMarket.address);
  await nft.deployed();
};