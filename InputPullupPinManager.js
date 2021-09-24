const { PinManager } = require('./PinManager')

class InputPullupPinManager extends PinManager {
  constructor({ RED, node, pinNum, chipNodeID }) {
    super({ RED, node, pinNum, chipNodeID })
    this.lastPinState = 'unknown'
    this.chip.registerInputPullUpPin({ pinNum, inputPullupPinManager: this })
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

module.exports = { InputPullupPinManager }
