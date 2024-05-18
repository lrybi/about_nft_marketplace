
import { network, deployments, getNamedAccounts, ethers } from "hardhat";

import { assert, expect } from "chai";

import { developmentChains, networkConfig } from "../../helper-hardhat-config"

import { NftMarketplace, BasicNft } from "../../typechain-types";

!developmentChains.includes(network.name) 
    ? describe.skip              
    : describe("Raffle Unit Tests", function () {
        let nftMarketplace: NftMarketplace, basicNft: BasicNft;
        const PRICE = ethers.parseEther("0.1");
        const TOKEN_ID = 0;

        beforeEach(async () => {
            const { deployer, user } = await getNamedAccounts();
            const userSigner1 = await ethers.getSigner(deployer);
            const contracts = await deployments.fixture(["all"]);
            nftMarketplace = await ethers.getContractAt("NftMarketplace", contracts["NftMarketplace"].address, userSigner1);
            basicNft = await ethers.getContractAt("BasicNft", contracts["BasicNft"].address, userSigner1);
            await basicNft.mintNft();
            await basicNft.approve(contracts["NftMarketplace"].address, TOKEN_ID);
                
        });

        it("lists and can be bought", async function () {
            await nftMarketplace.listItem(basicNft.target, TOKEN_ID, PRICE);
            const { deployer, user } = await getNamedAccounts();
            const userSigner1 = await ethers.getSigner(deployer);
            const userSigner2 = await ethers.getSigner(user);
            const user2ConnectedNftMarketplace = await nftMarketplace.connect(userSigner2);
                
            await user2ConnectedNftMarketplace.buyItem(
                basicNft.target, 
                TOKEN_ID, 
                {value : PRICE} 
            );
            const newOwner = await basicNft.ownerOf(TOKEN_ID);
            const user1Proceeds = await nftMarketplace.getProceeds(userSigner1.address);
            assert(newOwner.toString() == userSigner2.address.toString());
            assert(user1Proceeds.toString() == PRICE.toString());
        });

        // ...


    })
    

