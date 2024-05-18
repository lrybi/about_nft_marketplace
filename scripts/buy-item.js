
const { ethers, deployments, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKEN_ID = 1

async function buyItem() { 
    const { deployer } = await getNamedAccounts();
    signer = await ethers.getSigner(deployer);
    const _nftMarketplace = await deployments.get("NftMarketplace");
    const _basicNft = await deployments.get("BasicNft");
    const nftMarketplace = await ethers.getContractAt("NftMarketplace", _nftMarketplace.address, signer);
    const listing = await nftMarketplace.getListing(_basicNft.address, TOKEN_ID)
    const price = listing.price.toString()
    const tx = await nftMarketplace.buyItem(_basicNft.address, TOKEN_ID, { value: price })
    await tx.wait(1)
    console.log("NFT Bought!")
    
    if ((network.config.chainId == "31337")) {
        await moveBlocks(2, (sleepAmount = 1000)) 
    }
}

buyItem() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })