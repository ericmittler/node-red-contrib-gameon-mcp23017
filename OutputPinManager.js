const { PinManager } = require('./PinManager')

class OutputPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID }) {
    super({ RED, node, pinNum, chipNodeID })
    this.node.on('input', (msg, send, done) => this.input({ msg, send, done }))
  }

  input({ msg, send, done }) {
    const trueValues = [1, true, 'on', '1', 'true']
    const falseValues = [0, false, 'off', '0', 'false']
    const allValidValues = trueValues.concat(falseValues)
    if (allValidValues.includes(msg.payload)) {
      try {
        const value = [1, true, 'on', '1', 'true'].includes(msg.payload)
        this.node.status({
          fill: value ? 'green' : 'black', shape: 'dot',
          text: `Pin ${this.pinNum} @ ${this.chip.address} heard input "${value}"`
        })
        this.chip.digitalWriteOutput({ pinNum: this.pinNum, value })
      } catch (error) {
        done(error)
      }
    } else {
      this.node.warn(
        `Invalid msg.payload provided to gameon-mcp23017-output "${this.node.name}" (${this.node.id})`)
    }
    done()
  }
}

module.exports = { OutputPinManager }
