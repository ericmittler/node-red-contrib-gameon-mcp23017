const { MCP23017Chip } = require('./MCP23017ChipManager')
const { OutputPinManager } = require('./OutputPinManager')
const { InputPinManager } = require('./InputPinManager')
const { GameOnVersionInfo } = require('./GameOnVersionInfo')

module.exports = (RED) => {

  function MCP23017ChipConfigNode(config) {
    const node = this
    RED.nodes.createNode(node, config)
    this.chip = new MCP23017Chip({ RED, node, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-chip', MCP23017ChipConfigNode)

  function MCP23017OutputPinNode(config) {
    const node = this
    RED.nodes.createNode(node, config)
    this.eventManager = new OutputPinManager({ RED, node, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-output', MCP23017OutputPinNode)

  function MCP23017InputPinNode(config) {
    const node = this
    RED.nodes.createNode(node, config)
    this.eventManager = new InputPinManager({ RED, node, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-input', MCP23017InputPinNode)

  function GameOnMCP23017VersionNode(config) {
    const node = this
    RED.nodes.createNode(node, config)
    this.version = new GameOnVersionInfo({ node })
  }
  RED.nodes.registerType('gameon-mcp23017-version', GameOnMCP23017VersionNode)

}