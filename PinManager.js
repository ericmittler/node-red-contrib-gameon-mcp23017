class PinManager {
  constructor({ RED, node, pinNum, chipNodeID, invert }) {
    this.node = node
    this.pinNum = parseInt(pinNum)
    this.chipNodeID = chipNodeID
    this.chipNode = RED.nodes.getNode(this.chipNodeID)
    this.chip = this.chipNode.chip
    this.invert = invert
    this.node.status({
      fill: 'yellow', shape: 'dot',
      text: `Pin ${this.pinNum} @ ${this.chip.label()} initializing`
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

module.exports = { PinManager }