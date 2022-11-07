const { network } = require("hardhat")
const { verify } = require("../helper-function")
const { developmentChains, INITIAL_SUPPLY } = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const skyToken = await deploy("SkyToken", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  })
  console.log(`skyToken deployed at ${skyToken.address}`)

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(skyToken.address, [INITIAL_SUPPLY])
  }
}

module.exports.tags = ["all", "token"]
