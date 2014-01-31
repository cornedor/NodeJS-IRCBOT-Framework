module.exports = function(client, config) {
    var http = require('http');

    /**
     * Regexp to check if there is any url inside a string.
     */
    var urlRegExp = new RegExp("([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?(/.*)?");

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
                var url = urlRegExp.exec(message)[0];

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