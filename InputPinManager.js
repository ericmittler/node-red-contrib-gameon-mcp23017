const { PinManager } = require('./PinManager')

class InputPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID, invert, pullUp = true }) {
    super({ RED, node, pinNum, chipNodeID, invert })
    this.pullUp = pullUp
    this.lastPinState = 'unknown'
    this.chip.registerInputPin({ inputPinManager: this })
  }

  toggleState(state) {
    if (state != this.lastPinState) {
      this.node.log(`Changing state for pin ${this.pinNum} to ${state}`)
      const active = state === 'active'
      this.node.send({ payload: active })
      this.lastPinState = state
      this.node.status({
        fill: active ? 'green' : 'black', shape: 'dot',
        text: `Pull ${this.pullUp ? 'up' : 'down'} ` +
          `Pin ${this.pinNum} @  ${this.chip.address} ` +
          `${active ? 'ACTIVE' : 'inactive'}`
      })
    }
  }

}

module.exports = { InputPinManager }
