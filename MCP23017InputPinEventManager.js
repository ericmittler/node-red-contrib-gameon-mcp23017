const { MCP23017PinNodeEventManager } = require('./MCP23017PinNodeEventManager')

class MCP23017InputPinEventManager extends MCP23017PinNodeEventManager {
  constructor({ node }) {
    super({ node })
  }
}

module.exports = { MCP23017InputPinEventManager }
