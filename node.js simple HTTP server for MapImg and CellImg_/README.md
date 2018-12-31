# atlas.js simple HTTP server

The atlas.js node.js server is intended to do one thing - serve your `MapImg`, `CellImg_` and `/n/n/n.png` files over HTTP. It is written for this single purpose, and will serve no other files.

An executable version (Windows x64 exe) has been provided for your convenience as `atlas-simple-http-server.zip`.

### Configuration
Please remember to edit `localPort` and `serverGridFolder` to your liking, and remember to *port-forward*  the chosen port to your public IP.

### Running
Run the server either via `node atlas.js` or by launching `atlas-simple-http-server.exe`.

### Debugging
The simple HTTP server outputs full headers received and the raw request. Use these to debug what the Game server is trying (and failing) to do.

If you're getting repeated requests for the same file, **make sure your `SeamlessDataPort` is port-fordwarded and included in your starter cmd**. Once that is done, the server should stop making a fool of itself. ;]

### Required packages

- [fs]
- [http]
- [url]
- [nconf]
