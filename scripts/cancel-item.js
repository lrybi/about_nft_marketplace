
const { ethers, deployments, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

const TOKEN_ID = 0 

async function cancel() { 
    const { deployer } = await getNamedAccounts();
    signer = await ethers.getSigner(deployer);
    const _nftMarketplace = await deployments.get("NftMarketplace");
    const _basicNft = await deployments.get("BasicNft");
    const nftMarketplace = await ethers.getContractAt("NftMarketplace", _nftMarketplace.address, signer);
    const tx = await nftMarketplace.cancelListing(_basicNft.address, TOKEN_ID)
    await tx.wait(1)
    console.log("NFT Canceled!")

    if ((network.config.chainId == "31337")) {
        await moveBlocks(2, (sleepAmount = 1000)) 
    }
}

cancel() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

    