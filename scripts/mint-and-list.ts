
import { ethers, deployments, network, getNamedAccounts } from "hardhat";

import {moveBlocks} from "../utils/move-blocks";

const PRICE = ethers.parseEther("10");

async function mintAndList() { 
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const _nftMarketplace = await deployments.get("NftMarketplace");
    const _basicNft = await deployments.get("BasicNft");
    const nftMarketplace = await ethers.getContractAt("NftMarketplace", _nftMarketplace.address, signer);
    const basicNft = await ethers.getContractAt("BasicNft", _basicNft.address, signer);

    console.log("Minting NFT...")
    const mintTx = await basicNft.mintNft();
    const mintTxReceipt = await mintTx.wait(1);
    const tokenId = mintTxReceipt!.logs[0].args.tokenId; // console.log(tokenId);
    
    console.log("Approving NFT...");
    const approvalTx = await basicNft.approve(nftMarketplace.target, tokenId);
    await approvalTx.wait(1);

    console.log("Listing NFT...");
    const tx = await nftMarketplace.listItem(basicNft.target, tokenId, PRICE);
    await tx.wait(1);
    console.log("NFT Listed!");

    if (network.config.chainId == 31337) {
        await moveBlocks(1, 1000) 
    }

    console.log("seller:", signer.address);
    console.log("NFT Address:", _basicNft.address)
    console.log("Token ID:", tokenId);

}

mintAndList() 
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

