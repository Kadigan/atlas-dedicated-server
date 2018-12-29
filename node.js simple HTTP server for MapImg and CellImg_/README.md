# atlas.js simple HTTP server

The atlas.js node.js server is intended to do one thing - serve your `MapImg`, `CellImg_` and `/n/n/n.png` files over HTTP. It is written for this single purpose, and will serve no other files.

This server obviously requires you have **node.js** installed on your system. You will also require the `node_modules` included here in a .zip file for your convenience.

### Configuration
Please remember to edit `ServerWWWPort` and `ATLAS_ServerGrid_Folder` to your liking, and remember to *port-forward*  the chosen port to your public IP.

### Running
Run the server via `node atlas.js`

### Debugging
`atlas.js` outputs full headers received and the raw request. Use these to debug what the Game server is trying to do and failing.

If you're getting repeated requests for the same file, **make sure your `SeamlessDataPort` is port-fordwarded and included in your starter cmd**. Once that is done, the server should stop making a fool of itself. ;]