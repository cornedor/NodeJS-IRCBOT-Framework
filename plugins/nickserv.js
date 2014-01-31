module.exports = function(client, config) {
    /**
     * Check if there isset a password in the bot config.
     */
    if(!config.password) {
        console.log('[PLUGIN][NICKSERV][ERROR] The password setting is missing in the bot config.');
        return;
    }

    /**
     * Wait until the server asking for your auth.
     */
    client.addListener('notice', function(from, to, message) {
        if(message === 'This nickname is registered. Please choose a different nickname, or identify via /msg NickServ identify <password>.') {
            client.say(from, 'identify ' + config.password);
        }
    });
};