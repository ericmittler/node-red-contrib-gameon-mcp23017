const i2cBus = require('i2c-bus')

class MCP23017Chip {
  constructor({ node, name, addr, interval }) {
    this.name = name
    this.addr = parseInt(addr, 16)
    this.interval = interval
    this.node = node
    this.node.log(`------------------  name: ${this.name}`)
    this.node.log(`------------------  addr: ${this.addr}`)
    this.node.log(`------------------  interval: ${this.interval}`)
    // this.i2c = i2cBus.openSync(1)
    this.node.on('close', (removed, done) => this.close({ done, removed }))
  }

  close({ done, removed }) {
    done()
  }
}

module.exports = { MCP23017Chip }
