var irc     = require('irc'),
    filesys = require('fs'),

    bots    = [];

filesys.readdirSync('./bots').forEach(function(file) {
    if(file.substr(-5) === '.json') {
        var config  = require('./bots/' + file),
            plugins = [];

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

            config.plugins.forEach(function(plugin, config) {
                console.log('Loading plugin: ' + plugin);
                plugins.push(require('./plugins/' + plugin + '.js')(client));
            });

            bots.push(client);
        } else {

        }
    }
});