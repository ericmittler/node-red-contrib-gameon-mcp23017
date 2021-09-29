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
    this.mcp = new MCP23017(this.busNumber, this.address)
    this.node.on('close', (removed, done) => this.close({ done, removed }))
    this.intervalID = setInterval(() => { this.checkInputPins() }, this.intervalMs)
  }

  label() {
    return `Chip ${this.name} (bus ${this.busNumber}; address:0X${this.address.toString(16)})`
  }

  registerInputPin({ inputPinManager }) {
    try {
      this.mcp.setPinDirection(inputPinManager.pinNum, this.mcp.INPUT)
      const inputMode = inputPinManager.pullUp ? this.mcp.PULLUP_ENABLED : this.mcp.PULLUP_DISABLED
      this.mcp.setPinPullup(inputPinManager.pinNum, inputMode)
      this.mcp.invertPin(inputPinManager.pinNum, inputPinManager.invert ? 1 : 0)
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
      this.mcp.setPinDirection(outputPinManager.pinNum, this.mcp.OUTPUT)
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
      this.mcp.writePin(pinNum, value ? 1 : 0)
    } catch (error) {
      this.node.error('MCP23017Chip error @ digitalWriteOutput')
      console.error(error)
    }
  }

  checkInputPins() {
    try {
      Object.entries(this.inputPinManagers).map(([pinNumStr, inputPinMgr]) => {
        let value = this.mcp.readPin(inputPinMgr.pinNum)
        const state = value ? 'active' : 'inactive'
        inputPinMgr.toggleState(state)
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
