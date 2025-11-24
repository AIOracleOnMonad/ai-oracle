const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AI Oracle System", function () {
  let AiOracle, aiOracle;
  let MockERC20, aiToken;
  let Consumer, consumer;
  let owner, oracleNode, user;
  
  const FEE = ethers.parseEther("1"); // 1 AI Token fee

  beforeEach(async function () {
    [owner, oracleNode, user] = await ethers.getSigners();

    // Deploy Mock Token
    MockERC20 = await ethers.getContractFactory("MockERC20");
    aiToken = await MockERC20.deploy("AI Token", "AI");
    await aiToken.waitForDeployment();

    // Deploy Oracle
    AiOracle = await ethers.getContractFactory("AiOracle");
    aiOracle = await AiOracle.deploy(await aiToken.getAddress(), oracleNode.address);
    await aiOracle.waitForDeployment();
    
    // Set Model Fee
    await aiOracle.setModelFee("google/gemini-3-pro-preview", FEE);

    // Deploy Consumer
    Consumer = await ethers.getContractFactory("Consumer");
    consumer = await Consumer.deploy(await aiOracle.getAddress(), await aiToken.getAddress());
    await consumer.waitForDeployment();

    // Fund Consumer with AI Tokens
    await aiToken.mint(await consumer.getAddress(), ethers.parseEther("100"));
  });

  it("Should charge fee and emit event on request", async function () {
    const model = "google/gemini-3-pro-preview";
    const prompt = "Generate token ticker, name, supply, description based on current trends";
    const responseType = "string, string, uint256, string";

    // Expect Ask to emit RequestAiResponse
    await expect(consumer.requestAI(model, prompt, responseType))
      .to.emit(aiOracle, "RequestAiResponse")
      .withArgs(1, await consumer.getAddress(), model, prompt, responseType);

    // Check fee transfer
    expect(await aiToken.balanceOf(await aiOracle.getAddress())).to.equal(FEE);
    
    // Check pending requests
    const pending = await aiOracle.getPendingRequests(0, 10);
    expect(pending.length).to.equal(1);
    expect(pending[0].id).to.equal(1);
    expect(pending[0].prompt).to.equal(prompt);
  });
  
  it("Should fail if model is not supported", async function () {
    const model = "gpt-4";
    const prompt = "test";
    const responseType = "string";

    await expect(consumer.requestAI(model, prompt, responseType))
      .to.be.revertedWith("Model not supported");
  });

  it("Should batch fulfill requests", async function () {
    const model = "google/gemini-3-pro-preview";
    
    // Make 2 requests
    await consumer.requestAI(model, "req1", "string");
    await consumer.requestAI(model, "req2", "string");
    
    let pending = await aiOracle.getPendingRequests(0, 10);
    expect(pending.length).to.equal(2);
    
    const ids = [1, 2];
    const data1 = ethers.AbiCoder.defaultAbiCoder().encode(["string"], ["resp1"]);
    const data2 = ethers.AbiCoder.defaultAbiCoder().encode(["string"], ["resp2"]);
    
    await expect(aiOracle.connect(oracleNode).batchFulfill(ids, [data1, data2]))
      .to.emit(aiOracle, "AiResponseReceived");
      
    // Verify pending is empty
    pending = await aiOracle.getPendingRequests(0, 10);
    expect(pending.length).to.equal(0);
  });

  it("Should fulfill request and callback consumer", async function () {
    // 1. Make Request
    await consumer.requestAI("google/gemini-3-pro-preview", "prompt", "string, string, uint256, string");
    
    // 2. Oracle Node listens and fulfills
    const requestId = 1;
    const mockTicker = "TICKER";
    const mockName = "Name";
    const mockSupply = 1000000;
    const mockDesc = "Description";

    // Encode tuple: (string, string, uint256, string)
    const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(
        ["string", "string", "uint256", "string"], 
        [mockTicker, mockName, mockSupply, mockDesc]
    );

    // Connect as oracleNode to fulfill
    await expect(aiOracle.connect(oracleNode).fulfill(requestId, encodedData))
      .to.emit(aiOracle, "AiResponseReceived")
      .withArgs(requestId, await consumer.getAddress(), encodedData);

    // 3. Verify Consumer received and decoded data
    expect(await consumer.ticker()).to.equal(mockTicker);
    expect(await consumer.name()).to.equal(mockName);
    expect(await consumer.supply()).to.equal(mockSupply);
    expect(await consumer.description()).to.equal(mockDesc);
  });

  it("Should fail if non-oracle node tries to fulfill", async function () {
    await consumer.requestAI("google/gemini-3-pro-preview", "prompt", "type");
    const encodedData = ethers.AbiCoder.defaultAbiCoder().encode(["string"], ["fail"]);
    
    await expect(aiOracle.connect(user).fulfill(1, encodedData))
      .to.be.revertedWith("Only oracle node can fulfill");
  });
});
