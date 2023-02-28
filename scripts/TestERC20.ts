import { ethers } from "hardhat";


async function main (){
    const myERC20ContractFactory = await ethers.getContractFactory("MyERC20");
    const myERC20Contract = await myERC20ContractFactory.deploy(5);
    const deployTxnReceipt = await myERC20Contract.deployTransaction.wait();
    console.log(`contract deployed at address ${myERC20Contract.address} at block ${deployTxnReceipt.blockNumber}` );

    const signers = await ethers.getSigners();
    const signer = signers[0].address;

    const contractName = await myERC20Contract.name();
    const contractSymbol = await myERC20Contract.symbol();
    const totalSupply = await myERC20Contract.totalSupply();
  console.log(
    `my contract name is ${contractName}  and my contract symbol is ${contractSymbol} and my total SUpply is ${totalSupply}`
  );

    const mintTxn = await myERC20Contract.mint(signer, 2);
    const mintTxnReceipt = await mintTxn.wait();
    console.log({mintTxnReceipt});

    console.log(
      `my mint txn was completed in block ${mintTxnReceipt.blockNumber}  and my total SUpply is ${totalSupply}`
    );
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1;
})