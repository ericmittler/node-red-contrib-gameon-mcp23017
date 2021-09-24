const { PinManager } = require('./PinManager')

class OutputPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID }) {
    super({ RED, node, pinNum, chipNodeID })
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

module.exports = { OutputPinManager }
