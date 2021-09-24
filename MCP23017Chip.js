const MCP23017 = require('./mcp23017')
const { InputPullupPinManager } = require('./InputPullupPinManager')

class MCP23017Chip {
  constructor({ node, name, busNumber, address, intervalMs }) {
    this.name = name
    this.address = parseInt(address, 16)
    this.busNumber = parseInt(busNumber)
    this.intervalMs = intervalMs
    this.node = node
    this.inputPullUpPins = {}
    this.outputPins = {}
    this.mcp = new MCP23017({
      address: this.address,
      busNumber: this.busNumber,
      device: '/dev/i2c-1',
      logger: this.node
    })
    this.node.on('close', (removed, done) => this.close({ done, removed }))
    this.intervalID = setInterval(() => { this.checkInputPins() }, this.intervalMs)
  }

  registerInputPullUpPin({ pinNum, inputPullupPinManager }) {
    try {
      this.mcp.pinMode(pinNum, this.mcp.INPUT_PULLUP)
      delete this.outputPins[`${pinNum}`]
      this.inputPullUpPins[`${pinNum}`] = inputPullupPinManager
    } catch (error) {
      this.node.error('MCP23017Chip error @ registerInputPullUpPin')
      console.error(error)
    }
  }

  registerOutputPin({ pinNum, outputEventManager }) {
    try {
      this.mcp.pinMode(pinNum, this.mcp.OUTPUT)
      delete this.inputPullUpPins[`${pinNum}`]
      this.outputPins[`${pinNum}`] = outputEventManager
    } catch (error) {
      this.node.error('MCP23017Chip error @ registerOutputPin')
      console.error(error)
    }
  }

  digitalWriteOutput({ pinNum, value }) {
    try {
      this.mcp.digitalWrite(pinNum, value)
    } catch (error) {
      this.node.error('MCP23017Chip error @ digitalWriteOutput')
      console.error(error)
    }

  }

  checkInputPins() {
    try {
      for (const [key, obj] of Object.entries(this.inputPullUpPins)) {
        const isInputPullupPinManager = obj && obj.lastPinState &&
          obj.node && obj.node.type === 'gameon-mcp23017-input'
        if (isInputPullupPinManager) {
          this.mcp.digitalRead(obj.pinNum, (error, value) => {
            if (error) {
              console.error(error)
              this.node.error(error)
            } else {
              const state = value ? 'inactive' : 'active'
              obj.toggleState(state)
            }
          })
        }
      }
    } catch (error) {
      this.node.error('MCP23017Chip error @ checkInputPins')
      console.error(error)
    }
  }

  close({ done, removed }) {
    clearInterval(this.intervalID)
    done()
  }
}

module.exports = { MCP23017Chip }
