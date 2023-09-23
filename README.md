# Game On Berkeley's implementation of a MCP23017 i2c I/O Manager

This is still under construction. Use at your own risk. Much of this is just a hack to get a project off the ground. It only works with Node.js v14 (running node-red), and needs a little refactor with an @source to get working with node 16+ and node-red 3.1+

## Install
```
cd /home/pi/.node-red
npm install https://github.com/ericmittler/node-red-contrib-gameon-mcp23017.git
node-red-restart
```


## Upgrade
```
cd /home/pi/go_src/node_red
npm remove git://github.com/ericmittler/node-red-contrib-gameon-mcp23017.git
npm install https://github.com/ericmittler/node-red-contrib-gameon-mcp23017.git
node-red-restart
```
