module.exports = function(client, config) {

    /**
     * Simply copy someone else his message and repeat that.
     */
    client.addListener('message', function(from, to, message) {
        // Check if is in channel
        if(to.substr(0, 1) === '#') {
            client.say(to, from + ' said: ' + message);
        }
    });

};
