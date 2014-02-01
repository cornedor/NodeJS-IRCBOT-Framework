var irc     = require('irc'),
    filesys = require('fs'),
    repl    = require('repl'),
    net     = require('net'),
    bots    = [];

function startCommandLine(client, config) {
    repl.start({
        prompt: config.userName + " # ",
        eval: function(cmd, context, filename, callback) {
            cmd = cmd.substring(1, cmd.length-2);
            if(cmd === "help") {
                console.log("help           - Show this info");
                console.log("reload         - Reload all plugins");
                console.log("load <file>    - Load a plugin");
            } else if(cmd === "reload") {
                for(var i = 0; i < config.plugins.length; i++) {
                    var plugin = config.plugins[i];
                    delete require.cache[require.resolve("./plugins/" + plugin + ".js")];
                    
                    console.log('Loading plugin: ' + plugin);
                    config.__plugins[i] = (require('./plugins/' + plugin + '.js')(client, config));
                };
            } else if(cmd.substring(0, 4) === "load") {
                var file = cmd.substring(5, cmd.length);
                if(file === "") {
                    console.log("usage: load <file>");
                } else {
                    config.plugins.push(file);
                    console.log('Loading plugin: ' + file);
                    config.__plugins.push(require('./plugins/' + file + '.js')(client, config));
                }
            }
            callback();
        }
    });
}


filesys.readdirSync('./bots').forEach(function(file) {
    if(file.substr(-5) === '.json') {
        var config  = require('./bots/' + file);
        config.__plugins = [];
        config.__pluginNames = [];
        if(config.enabled === true) {
            var client = new irc.Client(config.server, config.nickName, {
                port:                   config.port,
                userName:               config.userName,
                realName:               config.realName,
                debug:                  config.debug,
                showErrors:             config.showErrors,
                autoRejoin:             config.autoRejoin,
                autoConnect:            config.autoConnect,
                channels:               config.channels,
                secure:                 config.secure,
                selfSigned:             config.selfSigned,
                certExpired:            config.certExpired,
                floodProtection:        config.floodProtection,
                floodProtectionDelay:   config.floodProtectionDelay,
                sasl:                   config.sasl,
                stripColors:            config.stripColors,
                channelPrefixes:        config.channelPrefixes,
                messageSplit:           config.messageSplit
            });

            client.addListener("message", function(from, to, message) {
                config.__plugins.forEach(function(plugin) {
                    if(plugin.onMessage != null) plugin.onMessage(from, to, message);
                });
            });

            config.plugins.forEach(function(plugin) {
                console.log('Loading plugin: ' + plugin);
                config.__plugins.push(require('./plugins/' + plugin + '.js')(client, config));
                config.__pluginNames.push(plugin);
            });

            startCommandLine(client, config);

            bots.push(client);
        } else {

        }
    }
});


