
# 🖼️ Ethereum NFT Marketplace

A decentralized application (dApp) built on Ethereum for creating, listing, and trading NFTs. This project combines smart contracts written in Solidity with a modern web frontend using React, Next.js, and Tailwind CSS. Ideal for developers looking to explore NFT standards, marketplace logic, and Ethereum dApp development.

---

## 📡 Live Demo

🔗 **Deployed App**: [https://eth-nft-marketplace.vercel.app](https://eth-nft-marketplace.vercel.app)

This app allows you to:

- Connect your wallet (MetaMask)
- Mint NFTs with metadata & image
- List them on a marketplace
- Purchase NFTs from others
- View your NFTs under a dashboard

> ⚠️ Connect to the Polygon Mumbai testnet using MetaMask for full functionality.

---

## 🛠 Tech Stack

- **Frontend**: React + Next.js + Tailwind CSS
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **Contracts**:
  - `NFT.sol`: ERC721 contract for minting tokens
  - `Market.sol`: Handles listings, purchases, and fee logic

---

## 🚀 Deployment Instructions (Live URL)

### 🔧 Smart Contracts

1. Compile:
```bash
npx hardhat compile
```

2. Deploy to Mumbai:
```bash
npx hardhat run scripts/deploy.js --network mumbai
```

3. Copy deployed contract addresses to `.env.local`

---

### 🌐 Frontend Deployment (Vercel)

1. Install CLI:
```bash
npm i -g vercel
vercel login
```

2. Set these environment variables in Vercel:
```
NEXT_PUBLIC_NFT_CONTRACT=<NFT contract address>
NEXT_PUBLIC_MARKET_CONTRACT=<Marketplace contract address>
NEXT_PUBLIC_CHAIN_ID=80001
```

3. Deploy:
```bash
vercel --prod
```

---

## 🧪 Testing on Polygon Mumbai

### 1. Configure MetaMask

- Network: **Polygon Mumbai**
- Chain ID: `80001`
- RPC: `https://rpc-mumbai.maticvigil.com`
- Faucet: [https://mumbaifaucet.com](https://mumbaifaucet.com)

### 2. Interact with Contracts

- Mint NFT:
```js
nftContract.createToken("ipfs://<CID>");
```

- List for Sale:
```js
market.createMarketItem(nftAddress, tokenId, price, { value: listingFee });
```

- Buy NFT:
```js
market.createMarketSale(nftAddress, tokenId, { value: price });
```

---

## 🧪 Testing with Frontend Wallet

1. **Visit** [https://eth-nft-marketplace.vercel.app](https://eth-nft-marketplace.vercel.app)  
2. **Connect MetaMask** → Select Mumbai testnet  
3. **Create NFT** → Upload file, enter name, description, price  
4. **Approve MetaMask Tx** → Confirm minting/listing  
5. **Buy NFT** → Confirm purchase transaction  
6. **My Items** → See your owned NFTs on the dashboard


## 📂 Folder Structure

```
/contracts        # Solidity smart contracts
/scripts          # Hardhat deployment scripts
/pages            # Next.js pages (routes)
/hooks            # React hooks for wallet & contracts
/public           # Assets & images
```

