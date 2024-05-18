import "@typechain/hardhat"

import "@nomicfoundation/hardhat-toolbox";

import "hardhat-deploy";

import "dotenv/config";

import { HardhatUserConfig } from "hardhat/config"

/** @type import('hardhat/config').HardhatUserConfig */

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https:/eth-sepolia";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";

const config: HardhatUserConfig = {

  solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.8.20" } 
    ]
  },

  defaultNetwork: "hardhat", 
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: { 
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111, 
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337, 
    }
  },

  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt", 
    noColors: true, 
    currency: "USD", 
    coinmarketcap: COINMARKETCAP_API_KEY,
    token: "ETH", 
  },

  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 1,
    }
  },
  
  mocha: {
    timeout: 500000,
  }
};

export default config;