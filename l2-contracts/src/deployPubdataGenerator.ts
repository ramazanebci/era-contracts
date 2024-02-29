// hardhat import should be the first import in the file
import * as hre from "hardhat";

import { Command } from "commander";
import { ethers, Wallet } from "ethers";
import { computeL2Create2Address, create2DeployFromL1, getNumberFromEnv } from "./utils";
import { web3Provider } from "../../l1-contracts/scripts/utils";
import * as fs from "fs";
import * as path from "path";

const provider = web3Provider();
const testConfigPath = path.join(process.env.ZKSYNC_HOME as string, "etc/test_config/constant");
const ethTestConfig = JSON.parse(fs.readFileSync(`${testConfigPath}/eth.json`, { encoding: "utf-8" }));

const priorityTxMaxGasLimit = getNumberFromEnv("CONTRACTS_PRIORITY_TX_MAX_GAS_LIMIT");

async function main() {
  const program = new Command();

  program
    .version("0.1.0")
    .name("deploy-pubdata-generator")
    .description("Deploys the pubdata generator contract to L2");

  program.option("--private-key <private-key>").action(async (cmd) => {
    const deployWallet = cmd.privateKey
      ? new Wallet(cmd.privateKey, provider)
      : Wallet.fromMnemonic(
          process.env.MNEMONIC ? process.env.MNEMONIC : ethTestConfig.mnemonic,
          "m/44'/60'/0'/0/1"
        ).connect(provider);
    console.log(`Using deployer wallet: ${deployWallet.address}`);

    const pubdataGeneratorBytecode = hre.artifacts.readArtifactSync("PubdataGenerator").bytecode;
    const create2Salt = ethers.constants.HashZero;
    const pubdataGeneratorAddress = computeL2Create2Address(
      deployWallet,
      pubdataGeneratorBytecode,
      "0x",
      create2Salt
    );

    // TODO: request from API how many L2 gas needs for the transaction.
    await create2DeployFromL1(deployWallet, pubdataGeneratorBytecode, "0x", create2Salt, priorityTxMaxGasLimit);

    console.log(`CONTRACTS_L2_PUBDATA_GENERATOR_ADDR=${pubdataGeneratorAddress}`);
  });

  await program.parseAsync(process.argv);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Error:", err);
    process.exit(1);
  });
