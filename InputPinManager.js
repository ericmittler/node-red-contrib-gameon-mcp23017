const { PinManager } = require('./PinManager')

class InputPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID, invert, pullUp = true }) {
    super({ RED, node, pinNum, chipNodeID, invert })
    this.pullUp = pullUp
    this.lastPinState = 'unknown'
    this.chip.registerInputPin({ inputPinManager: this })
  }

  label() {
    return `Input ${this.pullUp ? 'pull up ' : ''}pin ${this.pinNum} on ${this.chip.label()}`
  }

  toggleState(state) {
    if (state != this.lastPinState) {
      const active = state === 'active'
      this.node.send({ payload: active })
      this.lastPinState = state
      this.node.status({
        fill: active ? 'green' : 'black', shape: 'dot',
        text: `${this.label()} is ${active ? 'ACTIVE' : 'inactive'}`
      })
      this.node.debug(`Changed state for ${this.label()} to ${state}`)
    }
  }

}

module.exports = { InputPinManager }
