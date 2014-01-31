module.exports = function(client, config) {
    var request     = require('request'),
        x2j         = require('xml2json');

    /**
     * Check if the required settings are set for the bot.
     */
    if(!config.pandorabots_botid) {
        console.log('[PLUGIN][PANDORABOTS][ERROR] The password setting is pandorabots_botid in the bot config.');
        return;
    }

    /**
     *
     */
    client.addListener('message', function(from, to, message) {
        // Check if is in channel and when someone is talking to this bot.
        if(to.substr(0, 1) === '#' && message.substr(0, config.nickName.length) === config.nickName) {
            var input = encodeURIComponent(message.split(config.nickName + ': ').join('')),
                nick = encodeURIComponent(from),
                url = 'http://www.pandorabots.com/pandora/talk-xml?botid=' + config.pandorabots_botid + '&input=' + input + '&customid=username_' + nick;

            request(url, function(error, response, body) {
                if(!error && response.statusCode === 200) {
                    var json = JSON.parse(x2j.toJson(body, {sanitize: false}));
                    client.say(to, from + ': ' + json.result.that);
                }
            });
        }
    });
};