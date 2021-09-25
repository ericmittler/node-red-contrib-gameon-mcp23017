const { PinManager } = require('./PinManager')

class InputPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID, pullUp = true }) {
    super({ RED, node, pinNum, chipNodeID })
    this.pullUp = pullUp
    this.lastPinState = 'unknown'
    this.chip.registerInputPin({ pinNum, pullUp, inputPinManager: this })
  }

  toggleState(state) {
    if (state != this.lastPinState) {
      const active = state === 'active'
      this.node.send({ payload: active })
      this.lastPinState = state
      this.node.status({
        fill: active ? 'green' : 'black', shape: 'dot',
        text: `Pin ${this.pinNum} @  ${this.chip.address} ` +
          `${active ? 'ACTIVE' : 'inactive'}`
      })
    }
  }

}

module.exports = { InputPinManager }
