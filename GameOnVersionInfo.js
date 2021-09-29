
class GameOnVersionInfo {
  constructor({ node }) {
    this.versions = { 'gameon-mcp23017': '51' }
    this.node = node
    this.node.on('input', (msg, send, done) => this.sendVersions({ msg, send, done }))
    this.node.status({ fill: 'black', shape: 'dot', text: JSON.stringify(this.versions) })
  }

  sendVersions({ msg, send, done }) {
    msg.payload = this.versions
    send(msg)
    done()
  }
}

module.exports = { GameOnVersionInfo }