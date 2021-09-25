const { MCP23017Chip } = require('./MCP23017Chip')
const { OutputPinManager } = require('./OutputPinManager')
const { InputPullUpPinManager } = require('./InputPullUpPinManager')

module.exports = (RED) => {

  function MCP23017ChipConfigNode(config) {
    RED.nodes.createNode(this, config)
    this.chip = new MCP23017Chip({ RED, node: this, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-chip', MCP23017ChipConfigNode)

  function MCP23017OutputPinNode(config) {
    RED.nodes.createNode(this, config)
    this.eventManager = new OutputPinManager({ RED, node: this, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-output', MCP23017OutputPinNode)

  function MCP23017InputPinNode(config) {
    RED.nodes.createNode(this, config)
    this.eventManager = new InputPullUpPinManager({ RED, node: this, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-input', MCP23017InputPinNode)

}