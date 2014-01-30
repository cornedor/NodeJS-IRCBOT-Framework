module.exports = function(client, config) {

    client.addListener('message', function(from, to, message) {
        // Check if is in channel and when the bot is mentioned
        if(to.substr(0, 1) === '#' && message.substr(0, config.nickName.length) === config.nickName) {
            client.say(to, 'Hi ' + from + ', i am simple Open Source IRC bot framework written in NodeJS.');
            client.say(to, 'you can fork from on GitHub: https://github.com/kevinvdburgt/NodeJS-IRCBOT-Framework');
        }
    });

};