module.exports = function(client, config) {
    var http = require('http');

    /**
     * Regexp to check if there is any url inside a string.
     */
    var urlRegExp = new RegExp("https?://[a-z0-9\\.\\-]+(\\S*)");

    /**
     * Regexp to receive the page title.
     */
    var titleRegExp = new RegExp("<title>(.*?)</title>", "i");

    /**
     * Tell the title of a page when someone enters a URL.
     */
    client.addListener('message', function(from, to, message) {
        // Check if is in channel
        if(to.substr(0, 1) === '#') {
            
            if(urlRegExp.test(message)) {
                var a = urlRegExp.exec(message)[0];

                //client.say(to, '[DEBUG] Fetching url: ' + url);

                http.get(url, function(response) {
                    response.on('data', function(chunk) {
                        var match = titleRegExp.exec(chunk.toString());
                        if(match && match[1]) {
                            client.say(to, 'Title: ' + match[1]);
                        }
                    });
                });
            }

        }
    });

};
