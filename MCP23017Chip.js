const MCP23017 = require('./mcp23017')

class MCP23017Chip {
  constructor({ node, name, busNumber, address, intervalMs }) {
    this.name = name
    this.address = parseInt(address, 16)
    this.busNumber = parseInt(busNumber)
    this.intervalMs = intervalMs
    this.node = node
    this.inputPinManagers = {}
    this.outputPinManagers = {}
    this.mcp = new MCP23017({
      address: this.address,
      busNumber: this.busNumber,
      device: '/dev/i2c-1',
      logger: this.node
    })
    this.node.on('close', (removed, done) => this.close({ done, removed }))
    this.intervalID = setInterval(() => { this.checkInputPins() }, this.intervalMs)
  }

  registerInputPin({ pinNum, inputPinManager }) {
    try {
      const inputMode = inputPinManager.pullUp ? this.mcp.INPUT_PULLUP : this.mcp.INPUT
      this.mcp.pinMode(pinNum, inputMode)
      delete this.outputPinManagers[`${pinNum}`]
      this.inputPullUpPins[`${pinNum}`] = inputPinManager
    } catch (error) {
      this.node.error('MCP23017Chip error @ registerInputPin')
      console.error(error)
    }
  }

  registerOutputPin({ pinNum, outputEventManager }) {
    try {
      this.mcp.pinMode(pinNum, this.mcp.OUTPUT)
      delete this.inputPinManagers[`${pinNum}`]
      this.outputPinManagers[`${pinNum}`] = outputEventManager
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
      Object.entries(this.inputPinManagers).map(([pinNumStr, inputPinMgr]) => {
        this.mcp.digitalRead(inputPinMgr.pinNum, (error, value) => {
          if (error) {
            throw error
          } else {
            if (inputPinMgr.pullUp) { value = !value }
            const state = value ? 'inactive' : 'active'
            inputPinMgr.toggleState(state)
          }
        })
      })
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
