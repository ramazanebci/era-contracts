import * as hardhat from "hardhat";
import { expect } from "chai";
import type { ExecutorProvingTest } from "../../typechain";
import { ExecutorProvingTestFactory } from "../../typechain";
import { PubdataPricingMode } from "./utils";

describe("Executor test", function () {
  let executor: ExecutorProvingTest;

  before(async function () {
    const factory = await hardhat.ethers.getContractFactory("ExecutorProvingTest");
    const executorContract = await factory.deploy();
    executor = ExecutorProvingTestFactory.connect(executorContract.address, executorContract.signer);
  });

  /// This test is based on a block generated in a local system.
  it("Test hashes (Rollup)", async () => {
    const bootloaderHash = "0x010009416e909e0819593a9806bbc841d25c5cdfed3f4a1523497c6814e5194a";
    const aaHash = "0x0100065d134a862a777e50059f5e0fbe68b583f3617a67820f7edda0d7f253a0";
    const setResult = await executor.setHashes(aaHash, bootloaderHash);
    const finish = await setResult.wait();
    expect(finish.status == 1);

    const nextBatch = {
      // ignored
      batchNumber: 1,
      // ignored
      timestamp: 100,
      indexRepeatedStorageChanges: 84,
      newStateRoot: "0x9cf7bb72401a56039ca097cabed20a72221c944ed9b0e515c083c04663ab45a6",
      // ignored
      numberOfLayer1Txs: 10,
      // ignored
      priorityOperationsHash: "0x167f4ca80269c9520ad951eeeda28dd3deb0715e9e2917461e81a60120a14183",
      bootloaderHeapInitialContentsHash: "0x540442e48142fa061a81822184f7790e7b69dea92153d38ef623802c6f0411c0",
      eventsQueueStateHash: "0xda42ab7994d4695a25f4ea8a9a485a592b7a31c20d5dae6363828de86d8826ea",
      systemLogs:
        "0x00000000000000000000000000000000000000000000800b000000000000000000000000000000000000000000000000000000000000000416914ac26bb9cafa0f1dfaeaab10745a9094e1b60c7076fedf21651d6a25b5740000000a000000000000000000000000000000000000800b0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000651bcde0000000000000000000000000651bcde20001000a00000000000000000000000000000000000080010000000000000000000000000000000000000000000000000000000000000005167f4ca80269c9520ad951eeeda28dd3deb0715e9e2917461e81a60120a141830001000a00000000000000000000000000000000000080010000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0001000a00000000000000000000000000000000000080080000000000000000000000000000000000000000000000000000000000000000ee6ee8f50659bd8be3d86c32efb02baa5571cf3b46dd7ea3db733ae181747b8b0001000a0000000000000000000000000000000000008008000000000000000000000000000000000000000000000000000000000000000160fc5fb513ca8e6f6232a7410797954dcb6edbf9081768da24b483aca91c54db0001000a000000000000000000000000000000000000800800000000000000000000000000000000000000000000000000000000000000029a67073c2df8f53087fcfc32d82c98bba591da35df6ce1fb55a23b677d37f9fc",
      totalL2ToL1Pubdata:
        "0x0000000a000100000000000000000000000000000000000000008001760f6100ddbd86c4d5a58532923e7424d33ffb44145a26171d9b2595a349450b0000000000000000000000000000000000000000000000000000000000000001000100010000000000000000000000000000000000008001a789fe4e2a955eee45d44f408f86203c8f643910bf4888d1fd1465cdbc6376d800000000000000000000000000000000000000000000000000000000000000010001000200000000000000000000000000000000000080016ba43e7c7df11e5a655f22c9bce1b37434afd2bf8fcdb10100a460e6a2c0cc83000000000000000000000000000000000000000000000000000000000000000100010003000000000000000000000000000000000000800156e569838658c17c756aa9f6e40de8f1c41b1a67fea5214ec47869882ecda9bd0000000000000000000000000000000000000000000000000000000000000001000100040000000000000000000000000000000000008001ab5d064ba75c02635fd6e4de7fd8420eda54c4bda05bd61edabe201f2066d38f00000000000000000000000000000000000000000000000000000000000000010001000500000000000000000000000000000000000080015bcb6d7c735023e0884297db5016a6c704e3490ed0671417639313ecea86795b00000000000000000000000000000000000000000000000000000000000000010001000600000000000000000000000000000000000080015ee51b5b7d47fae5811a9f777174bb08d81d78098c8bd9430a7618756a0ceb8b00000000000000000000000000000000000000000000000000000000000000010001000700000000000000000000000000000000000080011ea63171021b9ab0846efbe0a06f7882d76e24a4900c74c14fa1e0bdf313ed560000000000000000000000000000000000000000000000000000000000000001000100080000000000000000000000000000000000008001574537f1665cd9c894d8d9834d32ed291f49ae1165a0e12a79a4937f2425bf70000000000000000000000000000000000000000000000000000000000000000100010009000000000000000000000000000000000000800190558033c8a3f7c20c81e613e00a9d0e678a7a14923e94e7cb99c8621c7918090000000000000000000000000000000000000000000000000000000000000001000000000000000001000c3104003d1291725c657fe486d0e626f562842175a705a9704c0980b40e3d716b95bbf9e8000100005dd96deb789fbc05264165795bf652190645bfae1ce253ce1db17087a898fb1e240ebf0d53563011198fddab33312923ba20f3c56cf1ba18ca5be9c053000100022bd65a924da61271d1dd5080fc640601185125830805e0ceb42f4185e5118fb454a12a3d9e0c1fbb89230f67044cc191e4f18459261233f659c9e2ba5e000100008b9feb52993729436da78b2863dd56d8d757e19c01a2cdcf1940e45ca9979941fa93f5f699afeab75e8b25cfea22004a8d2ea49f057741c2f2b910996d00010001bdf9205fb9bd185829f2c6bec2a6f100b86eff579da4fc2a8f1a15ea4afee3cea48e96b9bddb544b4569e60736a1f1fe919e223fcc08f74acf3513be1200010001bdf9205fb9bd185829f2c6bec2a6f100b86eff579da4fc2a8f1a15ea4a8755061217b6a78f5d5f8af6e326e482ebdc57f7144108662d122252ddcc27e7000100045dddc527887dc39b9cd189d6f183f16217393a5d3d3165fead2daeaf4f2d6916280c572561a809555de4a87d7a56d5bcca2c246a389dbb2a24c5639bdb0001000153c0f36532563ba2a10f52b865e558cd1a5eef9a9edd01c1cb23b74aa772beb4f3e3b784609f4e205a09863c0587e63b4b47664022cb34896a1711416b00010003e7842b0b4f4fd8e665883fe9c158ba8d38347840f1da0a75aca1fc284ce2428454b48df9f5551500fc50b63af4741b1cd21d4cfddc69aa46cb78eff45b00010000f183703a165afed04326ad5786316f6fc65b27f1cf17459a52bd1f57f27f896b7429e070ca76e3e33165ec75f6c9f439ee37f3b58822494b1251c8247500010001bdf9205fb9bd185829f2c6bec2a6f100b86eff579da4fc2a8f1a15ea4a05ea3d0bb218598c42b2e25ae5f6cbc9369b273ee6610450cade89775646b2a08902000000000000000000000000000000008b71d4a184058d07fccac4348ae02a1f663403231b0a40fa2c8c0ff73bdca092890200000000000000000000000000000000ab63c4cebbd508a7d7184f0b9134453eea7a09ca749610d5576f8046241b9cde890200000000000000000000000000000000e58af14be53d8ac56f58ff3e5b07c239bfb549149f067597e9d028f35e3c2b77890200000000000000000000000000000000b78e94980fec3a5f68aa25d0d934084907688e537e82c2942af905aab21413ab890200000000000000000000000000000000c4db460819691e825328b532024bbecdc40394c74307a00bd245fc658b1bd34f0901908827f2052a14b24a10cae1f9e259ead06a89a1d74ff736a54f54ebcf05eeb30901d32d07305b87debd25698d4dfac4c2f986693a4e9d9baff7da37a7b5ca8d01cb0901e73042e5dacff2ce20a720c9c6d694576e4afa7bbbafdc4d409c63b7ca8027b70901760a7405795441aceea3be649a53d02785cb3487b7bd23e3b4888a935cee010d09011f3acf5d6d7bfeab8a7112771866e28c3714e0c315a81ec6a58ab4ad1c3d6eb10901c207b49d14deb3af9bc960d57074e27386285c73248abc5fa1d72aa6e8664fa40901644f0c4e15446d7e5ff363c944b55bd6801a1f38afd984c3427569530cb663210901743be0243628b8e7e8f04c00fc4f88efae001250a7482b31e6a0ec87ee3598e7090171e91721f9918576d760f02f03cac47c6f4003316031848e3c1d99e6e83a47434102d84e69f2f480002d5a6962cccee5d4adb48a36bbbf443a531721484381125937f3001ac5ff875b41022f496efbbdb2007b727eb806c926fb20c8ad087c57422977cebd06373e26d19b640e5fe32c85ff39a904faf736ce00a25420c1d9d705358c134cc601d9d184cb4dfdde7e1cac2bc3d4d38bf9ec44e6210ee6b280123bafc586f77764488cd24c6a77546e5a0fe8bdfb4fa203cfaffc36cce4dd5b8901000000000000000000000000651bcde08e7dd06ac5b73b473be6bc5a51030f4c7437657cb7b29bf376c564b8d1675a5e8903000000000000000000000000651bcde24ba84e1f37d041bc6e55ba396826cc494e84d4815b6db52690422eea7386314f00e8e77626586f73b955364c7b4bbf0bb7f7685ebd40e852b164633a4acbd3244c3de2202ccb626ad387d70722e64fbe44562e2f231a290c08532b8d6aba402ff50025fe002039e87b424de2772b82d935f14e2b657429a1bcc04612391ea0330c90ebddefdda48eb2aa7f66ecf7940a280e9ef3fb2e95db0995538440a62af79861004434720529e816fd2e40f8031a8d7471ebcd00351db0787346bcfe8dfad8d2b479093588d0e847efa73a10ce20e4799fb1e46642d65617c7e5213fa04989d92d8903000000000000000000000000651bcde287ded247e1660f827071c7f1371934589751085384fc9f4462c1f1897c5c3eef890100000000000000000000000000000001911dd2ad743ff237d411648a0fe32c6d74eec060716a2a74352f6b1c435b5d670016914ac26bb9cafa0f1dfaeaab10745a9094e1b60c7076fedf21651d6a25b574686a068c708f1bdbefd9e6e454ac2b520fd41c8dcf23ecd4cee978c22f1c1f5f09ff974fe8b575175cefa919a5ba1c0ddf4409be4b16695dc7bd12f6701b99bd2e70a152312ad6f01657413b2eae9287f6b9adad93d5fed1a0dd5e13ec74ce1163146509bfe426f2315a69cb452bf388cccd321eca2746a1adf793b489e5c8f61c40688b7ef3e53defc56c78facf513e511f9f5ba0eb50dbcc745afea3b860da75b394d2d1627b6e2ef54fb7b187d0af61e4532c238f387ecf9f0b466f1d54414100018e519b65c8901b344a480638beadb923fbd3462e475d39acebe559d65ed5cb11a1b25279f1918477c35eec1332ff07001d3f85cf854b70d7552f93ba8e88d581064ca4c0df6ac456c00a0e83898ccd464c63e5008aa1a498cc0646b78eb216d9eeeec76ed0eb0ee6c352f35ca5f0b2edc2ca17d211cc5cb905ba10142f042a6ac836d9cef9a6916635c9a1c1d2dc62a9fe83e2230b506b98e0fded46249008fe28b813907a05ae0d773d8f31e330200e9336e0159034c137ed645fb67ccca8a152312ad6f01657413b2eae9287f6b9adad93d5fee5d8f810abde496ccbeb45a4f3c06af828975163a006257cbf18cefebbfb4cd409025f40404a3d37bba024799ce32d7c2a833aec8474288a26b246afa32b07b4a3ce00577261707065642045746865720000000000000000000000000000000000001a09cf14f266dfe87c4b33e6d934de01f8f7242199fa8783178117218fa033f7ab005745544800000000000000000000000000000000000000000000000000000008289026c5fa173652bd62774824698a6848c63031f853d0e275174552f35df33000577261707065642045746865720000000000000000000000000000000000001a1e59309944cbc900ae848855e10bc929f78e86c2179d6e96cf52bfd520f039200031000000000000000000000000000000000000000000000000000000000000021653a735395136e5494c5426ba972b45e34d36ebcb86ac104c724ab375fcce90a18580ba6aeebc6e6b89d226c79be8927257a436ad11d9c0305b18e9d78cab8f75a3aec2096302b67e3815939e29476fb36a0d8299a1b25279f1918477c35eec1332ff07001d3f85cf85688525f98e4859a9c6939f2d2f92e6b1950ed57e56137d717aca1ccf9754f719a1c7ebe9226d26524400a8959a08f411a727ae7bb68f8febecd89ffe9d84708d24544d452de3e22e62b3b2b872e430839a15115818a152312ad6f01657413b2eae9287f6b9adad93d5fe3fb60af355125687beeb90c066ace76c442b0f963a6afd0e3316fcdd673ad22c09ff30c8a03ec44e5337a1f9d66763cf1b319fdc6d8bc4981e1f47edbd86210614b909ff0cbdceb634b81192417b64d114d535ad3bdba97d6d7e90ee2a79bf1c132d3c2d09ff5cd85060f4ff26eb5b68a6687aee76c1b7a77575fdc86ba49b4faf5041377a79b14de8989f2385a6e23f6bd05a80e0d9231870c15a000142e50adc0d84bff439d0086d9fbab9984f8b27aa208935238a60cc62e7c9bb2ea1709e94c96366b3c40ea4854837c18733e5ac1193b8d8e4070d2eca4441b0378b572bd949ab764fd71c002b759613c3e29d425cf4000100012730c940a81021004e899c6ee4bec02f0667757b9d75a8f0714ce6c157f5940b7664e4f69f01fc530db36965e33599a1348629f07ae2d724007ac36a71a16baac84db583d88e0f3a8c082e3632fcc0e15757f0dcf5234b87af41fdee4c0999c4fe698a8d824415979ab839e6913a975a3055a152312ad6f01657413b2eae9287f6b9adad93d5fe",
    };

    const processL2Logs = await executor.processL2Logs(
      nextBatch,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      PubdataPricingMode.Rollup
    );
    expect(processL2Logs.stateDiffHash, "State diff hash computation failed").is.equal(
      "0x9a67073c2df8f53087fcfc32d82c98bba591da35df6ce1fb55a23b677d37f9fc"
    );

    const nextCommitment = await executor.createBatchCommitment(nextBatch, processL2Logs.stateDiffHash);
    console.log("This block Commitment is : " + nextCommitment);
    expect(nextCommitment, "Commitment computation failed").is.equal(
      "0xae36e9bed834f99d427adb8958935f38f46b6431c31c5711587d39cf2c93da90"
    );

    const prevCommitment = "0x6ebf945305689a8c3ac993df7f002d41d311a762cd6bf39bb054ead8d1f54404";
    const result = await executor.getBatchProofPublicInput(prevCommitment, nextCommitment, {
      recursionNodeLevelVkHash: "0x5a3ef282b21e12fe1f4438e5bb158fc5060b160559c5158c6389d62d9fe3d080",
      recursionLeafLevelVkHash: "0x72167c43a46cf38875b267d67716edc4563861364a3c03ab7aee73498421e828",
      // ignored.
      recursionCircuitsSetVksHash: "0x05dc05911af0aee6a0950ee36dad423981cf05a58cfdb479109bff3c2262eaac",
    });
    expect(result.toHexString(), "").to.be.equal("0x66876e724acc551e35d48f5c091447a245efcc79d70bb840533ddf83");
  });

  it("Test hashes (Validium)", async () => {
    const bootloaderHash = "0x010009416e909e0819593a9806bbc841d25c5cdfed3f4a1523497c6814e5194a";
    const aaHash = "0x0100065d134a862a777e50059f5e0fbe68b583f3617a67820f7edda0d7f253a0";
    const setResult = await executor.setHashes(aaHash, bootloaderHash);
    const finish = await setResult.wait();
    expect(finish.status == 1);

    const nextBatch = {
      // ignored
      batchNumber: 1,
      // ignored
      timestamp: 100,
      indexRepeatedStorageChanges: 84,
      newStateRoot: "0x9cf7bb72401a56039ca097cabed20a72221c944ed9b0e515c083c04663ab45a6",
      // ignored
      numberOfLayer1Txs: 10,
      // ignored
      priorityOperationsHash: "0x167f4ca80269c9520ad951eeeda28dd3deb0715e9e2917461e81a60120a14183",
      bootloaderHeapInitialContentsHash: "0x540442e48142fa061a81822184f7790e7b69dea92153d38ef623802c6f0411c0",
      eventsQueueStateHash: "0xda42ab7994d4695a25f4ea8a9a485a592b7a31c20d5dae6363828de86d8826ea",
      systemLogs:
        "0x00000000000000000000000000000000000000000000800b000000000000000000000000000000000000000000000000000000000000000416914ac26bb9cafa0f1dfaeaab10745a9094e1b60c7076fedf21651d6a25b5740000000a000000000000000000000000000000000000800b0000000000000000000000000000000000000000000000000000000000000003000000000000000000000000651bcde0000000000000000000000000651bcde20001000a00000000000000000000000000000000000080010000000000000000000000000000000000000000000000000000000000000005167f4ca80269c9520ad951eeeda28dd3deb0715e9e2917461e81a60120a141830001000a00000000000000000000000000000000000080010000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a0001000a00000000000000000000000000000000000080080000000000000000000000000000000000000000000000000000000000000000ee6ee8f50659bd8be3d86c32efb02baa5571cf3b46dd7ea3db733ae181747b8b0001000a0000000000000000000000000000000000008008000000000000000000000000000000000000000000000000000000000000000160fc5fb513ca8e6f6232a7410797954dcb6edbf9081768da24b483aca91c54db0001000a000000000000000000000000000000000000800800000000000000000000000000000000000000000000000000000000000000029a67073c2df8f53087fcfc32d82c98bba591da35df6ce1fb55a23b677d37f9fc",
      totalL2ToL1Pubdata: "0x",
    };

    const processL2Logs = await executor.processL2Logs(
      nextBatch,
      "0x0000000000000000000000000000000000000000000000000000000000000000",
      PubdataPricingMode.Validium
    );
    expect(processL2Logs.stateDiffHash, "State diff hash computation failed").is.equal(
      "0x9a67073c2df8f53087fcfc32d82c98bba591da35df6ce1fb55a23b677d37f9fc"
    );

    const nextCommitment = await executor.createBatchCommitment(nextBatch, processL2Logs.stateDiffHash);
    console.log("This block Commitment is : " + nextCommitment);
    expect(nextCommitment, "Commitment computation failed").is.equal(
      "0xae36e9bed834f99d427adb8958935f38f46b6431c31c5711587d39cf2c93da90"
    );

    const prevCommitment = "0x6ebf945305689a8c3ac993df7f002d41d311a762cd6bf39bb054ead8d1f54404";
    const result = await executor.getBatchProofPublicInput(prevCommitment, nextCommitment, {
      recursionNodeLevelVkHash: "0x5a3ef282b21e12fe1f4438e5bb158fc5060b160559c5158c6389d62d9fe3d080",
      recursionLeafLevelVkHash: "0x72167c43a46cf38875b267d67716edc4563861364a3c03ab7aee73498421e828",
      // ignored.
      recursionCircuitsSetVksHash: "0x05dc05911af0aee6a0950ee36dad423981cf05a58cfdb479109bff3c2262eaac",
    });
    expect(result.toHexString(), "").to.be.equal("0x66876e724acc551e35d48f5c091447a245efcc79d70bb840533ddf83");
  });
});
