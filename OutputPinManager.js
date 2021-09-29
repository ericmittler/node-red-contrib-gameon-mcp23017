const { PinManager } = require('./PinManager')

class OutputPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID, invert }) {
    super({ RED, node, pinNum, chipNodeID, invert })
    this.node.on('input', (msg, send, done) => this.input({ msg, send, done }))
    this.chip.registerOutputPin({ outputPinManager: this })
  }

  label() {
    return `Output pin ${this.pinNum} ` +
      (this.invert ? '(inverted) ' : '') + `on ${this.chip.label()}`
  }

  input({ msg, send, done }) {
    const trueValues = [1, true, 'on', '1', 'true']
    const falseValues = [0, false, 'off', '0', 'false']
    const allValidValues = trueValues.concat(falseValues)
    if (allValidValues.includes(msg.payload)) {
      try {
        let value = [1, true, 'on', '1', 'true'].includes(msg.payload)
        if (this.invert) { value = !value }
        this.chip.digitalWriteOutput({ pinNum: this.pinNum, value })
        this.node.status({
          fill: value ? 'green' : 'black', shape: 'dot',
          text: `Output pin ${this.pinNum} on ${this.chip.label()} last wrote "${value}"`
        })
        send({payload: value})
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
