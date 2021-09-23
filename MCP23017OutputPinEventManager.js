const { MCP23017PinNodeEventManager } = require('./MCP23017PinNodeEventManager')

class MCP23017OutputPinEventManager extends MCP23017PinNodeEventManager {
  constructor({ node, pinNum, chipNodeID, chipID }) {
    super({ node, pinNum, chipNodeID })
    this.node.on('input', (msg, send, done) => this.input({ msg, send, done }))
  }

  input({ msg, send, done }) {
    try {
      const message = msg.payload.toString()
      msg.payload = message.toUpperCase() + ' - chicken pizza'
      send(msg)
    } catch (error) {
      done(error)
    }
    done()
  }
}

module.exports = { MCP23017OutputPinEventManager }
