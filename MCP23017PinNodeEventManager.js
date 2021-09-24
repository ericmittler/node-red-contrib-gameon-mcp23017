class MCP23017PinNodeEventManager {
  constructor({ RED, node, pinNum, chipNodeID }) {
    this.node = node
    this.pinNum = pinNum
    this.chipNodeID = chipNodeID
    this.chip = RED.nodes.getNode(this.chipNodeID)
    // this.logAttribute('this.chip', this.chip)
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$')
    console.log(this.chip)
    this.node.status({
      fill: 'yellow', shape: 'dot',
      text: `Pin ${this.pinNum} @  initializing`
    })
    this.node.on('close', (removed, done) => this.close({ done, removed }))
  }

  close({ done, removed }) {
    done()
  }

  logAttribute(attribute, value = {}) {
    this.node.log(`${attribute}: ${JSON.stringify(value, undefined, 2)}`)
  }
}

module.exports = { MCP23017PinNodeEventManager }