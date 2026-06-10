# Game On Berkeley's implementation of a MCP23017 i2c I/O Manager

This is still under construction. We are just doing the minimum here to get it working on our Raspberry Pis at Game On.


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

## Wish List

 - Unit tests
 - Get working with a newer version of Node
 - Clean up the meaningless variable names
 - Provide an example node-red flow.json with documentation for newbie coders to script kiddy
 - Fix the node-red status to be more intelligible
 - On node-red start-up, an event is fired with the initial condition. It would be super nice if that was an option.
