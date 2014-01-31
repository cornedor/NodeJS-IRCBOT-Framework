NodeJS IRCBOT Framework
===

An simple Open Source IRC bot framework written in NodeJS

Features
---
- Multiply bot clients
- Easy to write plugins

Plugins
---
- copycat, copies text (used for testing)
- linktitle, get the title of a webpage when someone enters a website URL (thanks to corne dorrestijn for fixing the regex!)
- nickserv, identify your bot with the nickserv password.

Todo
---
- Framework commandline manager
- Other stuff
- More plugins :-)

Prerequisites
---
- NodeJS 0.8 (Tested under 0.10.25)
- irc 0.3.6

How to run
---
Install all dependencies of the Framework using
```npm install```

Modify or add you bot configurations in ./bots/*.js 

Start this bot framework using
```node index.js```
