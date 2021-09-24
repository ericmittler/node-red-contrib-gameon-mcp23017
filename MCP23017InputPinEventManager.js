const { MCP23017PinNodeEventManager } = require('./MCP23017PinNodeEventManager')

class MCP23017InputPinEventManager extends MCP23017PinNodeEventManager {
  constructor({ RED, node, pinNum, chipNodeID  }) {
    super({ RED, node, pinNum, chipNodeID  })
    this.count = 0
    setInterval(this.sendCount, 1000)
  }

  sendCount() {
    this.count += 1
    this.node.log(`this.count: ${this.count}`)
    this.node.send(this.count)
  }

}

module.exports = { MCP23017InputPinEventManager }
