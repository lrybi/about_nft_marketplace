
const { ethers, deployments, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");


async function mint() {
    const { deployer } = await getNamedAccounts();
    signer = await ethers.getSigner(deployer);
    const _basicNft = await deployments.get("BasicNft");
    const basicNft = await ethers.getContractAt("BasicNft", _basicNft.address, signer);

    console.log("Minting NFT...")
    const mintTx = await basicNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    const tokenId = mintTxReceipt.logs[0].args.tokenId;
    console.log("NFT Minted!");
    console.log(`NFT Address: ${basicNft.target}`)
    console.log(`Got TokenID: ${tokenId}`)

    if (network.config.chainId == 31337) {
        await moveBlocks(1, (sleepAmount = 1000)) 
    }

}

mint() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })


