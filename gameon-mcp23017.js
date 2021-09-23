class Chip {
  constructor({ node, name, addr, interval }) {
    this.name = name
    this.addr = parseInt(addr, 16)
    this.interval = interval
    this.node = node
    this.node.log(`------------------  name: ${this.name}`)
    this.node.log(`------------------  addr: ${this.addr}`)
    this.node.log(`------------------  interval: ${this.interval}`)
  }
}

const { MCP23017OutputPinEventManager } = require('./MCP23017OutputPinEventManager')
const { MCP23017InputPinEventManager } = require('./MCP23017InputPinEventManager')

module.exports = (RED) => {

  function MCP23017ChipConfigNode(config) {
    RED.nodes.createNode(this, config)
    this.chip = new Chip({ RED, node: this, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-chip', MCP23017ChipConfigNode)

  function MCP23017OutputPinNode(config) {
    RED.nodes.createNode(this, config)
    this.eventManager = new MCP23017OutputPinEventManager({ RED, node: this, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-output', MCP23017OutputPinNode)

  function MCP23017InputPinNode(config) {
    RED.nodes.createNode(this, config)
    this.eventManager = new MCP23017InputPinEventManager({ RED, node: this, ...config })
  }
  RED.nodes.registerType('gameon-mcp23017-input', MCP23017InputPinNode)

}