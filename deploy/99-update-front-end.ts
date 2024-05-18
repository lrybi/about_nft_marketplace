
import { deployments, network, ethers} from "hardhat";

import fs from "fs";

import "dotenv/config";

const FRONT_END_ADDRESSES_FILE = "../nextjs_nft_marketplace/constants/networkMappingAddresses.json";
const FRONT_END_ABI_NFT_MARKETPLACE_FILE = "../nextjs_nft_marketplace/constants/abiNftMarketplace.json";

const updateFrontEnd = async function () {
    if (process.env.UPDATE_FRONT_END) { 
        console.log("Updating to front end...");

        await updateContractAddresses2();
        await updateAbi2();

        console.log("Front end Updated!")
        console.log("------------------------------------")
    }
}

//-------------------------------------------------

async function updateAbi2() {
    const _nftMarketplace = await deployments.get("NftMarketplace");
    const nftMarketplaceAddress = _nftMarketplace.address;
    const nftMarketplace = await ethers.getContractAt("NftMarketplace", nftMarketplaceAddress);

    fs.writeFileSync(FRONT_END_ABI_NFT_MARKETPLACE_FILE, JSON.stringify(nftMarketplace.interface.fragments));
}

async function updateContractAddresses2() {
    const _nftMarketplace = await deployments.get("NftMarketplace");
    const nftMarketplaceAddress = _nftMarketplace.address;
    const nftMarketplace = await ethers.getContractAt("NftMarketplace", nftMarketplaceAddress);
       
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf-8"));
    
    if (network.config.chainId!.toString() in currentAddresses) {
        
        if (!currentAddresses[network.config.chainId!.toString()]["NftMarketplace"].includes(nftMarketplace.target)) {
            currentAddresses[network.config.chainId!.toString()]["NftMarketplace"] = [nftMarketplace.target];
        }
    } else {
        currentAddresses[network.config.chainId!.toString()] = { NftMarketplace: [nftMarketplace.target]};
    }
    
    fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses));
}

export default updateFrontEnd;


updateFrontEnd.tags = ["all"];