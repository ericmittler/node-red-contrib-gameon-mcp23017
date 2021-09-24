const { MCP23017PinNodeEventManager } = require('./MCP23017PinNodeEventManager')

class MCP23017InputPinEventManager extends MCP23017PinNodeEventManager {
  constructor({ RED, node, pinNum, chipNodeID }) {
    super({ RED, node, pinNum, chipNodeID })
    this.count = 0
    setInterval(() => { this.checkPinChange() }, 1000)
  }

  checkPinChange() {
    this.count += 1
    this.logAttribute('this.count', this.count)
    const msg = { payload: this.count }
    this.node.send(msg)
  }

}

module.exports = { MCP23017InputPinEventManager }
