module.exports = function(client, config) {
    var exec = require("child_process").exec;
    function onMessage(from, to, message) {
        if(to.substr(0, 1) === "#" && message.substr(0, 7) === "!uptime") {
            var child = exec("uptime", function(err, out, stderr) {
                client.say(to, out);
            });
        }
    }
    return {
        onMessage: onMessage
    }
}
