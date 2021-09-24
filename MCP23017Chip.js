const MCP23017 = require('mcp23017')

class MCP23017Chip {
  constructor({ node, name, busNumber, address, intervalMs }) {
    this.name = name
    this.address = parseInt(address, 16)
    this.intervalMs = intervalMs
    this.node = node
    this.inputPullUpPins = [
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null
    ]
    this.mcp = new MCP23017({ address, busNumber, device: '/dev/i2c-1', logger: this.node })
    this.removeCountLater = 0
    this.node.on('close', (removed, done) => this.close({ done, removed }))
    this.intervalID = setInterval(() => { this.checkInputPins() }, this.intervalMs)
  }

  setInputPullUpPin({ pinNum, inputEventManager }) {
    mcp.pinMode(pinNum, mcp.INPUT_PULLUP)
    this.inputPullUpPins[pinNum] = inputEventManager
  }

  checkInputPins() {
    this.inputPullUpPins.map((pin) => {
      if (typeof pin === InputPullupPinManager) {
        this.mcp.digitalRead(pin.pinNum, (error, value) => {
          if (error) {
            console.error(error)
            this.node.error(error)
          } else {
            const state = value ? 'inactive' : 'active'
            pin.toggleState(state)
          }
        })
      }
    })
  }

  close({ done, removed }) {
    clearInterval(this.intervalID)
    done()
  }
}

module.exports = { MCP23017Chip }
