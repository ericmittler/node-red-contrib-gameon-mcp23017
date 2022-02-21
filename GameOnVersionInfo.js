

class GameOnVersionInfo {
  constructor({ node }) {
    this.versions = { 'gameon-mcp23017': '53' }
    this.node = node
    this.node.on('input', (msg, send, done) => this.sendVersions({ msg, send, done }))
    const version = JSON.stringify(this.versions)
    this.node.status({ fill: 'black', shape: 'dot', text: version })
    this.node.log(`gameon-mcp23017 version is ${version}`)
  }

  sendVersions({ msg, send, done }) {
    msg.payload = this.versions
    send(msg)
    done()
  }
}

module.exports = { GameOnVersionInfo }