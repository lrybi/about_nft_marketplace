
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { DeployFunction } from "hardhat-deploy/types";

import { networkConfig, developmentChains } from "../helper-hardhat-config";

import verify from "../utils/verify";

import "dotenv/config";
    
const deployBasicNft: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { deployments, getNamedAccounts, network, ethers } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    
    log("----------------------------------------------------")
    const args: any[] = [];
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    
    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(basicNft.address, args);
    }
    log("------------------------------------------");
}

export default deployBasicNft;
    
deployBasicNft.tags = ["all", "basicnft"];
    
    
