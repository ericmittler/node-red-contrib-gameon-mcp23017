const MCP23017 = require('./mcp23017')

class MCP23017ChipManager {
  constructor({ node, name, address, intervalMs }) {
    this.name = name
    this.address = parseInt(address, 16)
    this.busNumber = 1
    this.intervalMs = intervalMs
    this.node = node
    this.inputPinManagers = {}
    this.outputPinManagers = {}
    this.mcp = new MCP23017({
      address: this.address,
      busNumber: this.busNumber,
      device: `/dev/i2c-1`,
      logger: this.node
    })
    this.node.on('close', (removed, done) => this.close({ done, removed }))
    this.intervalID = setInterval(() => { this.checkInputPins() }, this.intervalMs)
  }

  label() {
    return `Chip ${this.name} (bus ${this.busNumber}; address:0X${this.address.toString(16)})`
  }

  registerInputPin({ inputPinManager }) {
    try {
      const inputMode = inputPinManager.pullUp ? this.mcp.INPUT_PULLUP : this.mcp.INPUT
      this.mcp.pinMode(inputPinManager.pinNum, inputMode)
      delete this.outputPinManagers[`${inputPinManager.pinNum}`]
      this.inputPinManagers[`${inputPinManager.pinNum}`] = inputPinManager
      this.node.log(`Registered ${inputPinManager.label()} @ ${this.label()}`)
    } catch (error) {
      this.node.error('MCP23017Chip error @ registerInputPin')
      console.error(error)
    }
  }

  registerOutputPin({ outputPinManager }) {
    try {
      this.mcp.pinMode(outputPinManager.pinNum, this.mcp.OUTPUT)
      delete this.inputPinManagers[`${outputPinManager.pinNum}`]
      this.outputPinManagers[`${outputPinManager.pinNum}`] = outputPinManager
      this.node.log(`Registered output pin ${outputPinManager.pinNum} @ ${this.label()}`)
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
            if (inputPinMgr.invert) { value = !value }
            const state = value ? 'active' : 'inactive'
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

module.exports = { MCP23017Chip: MCP23017ChipManager }
