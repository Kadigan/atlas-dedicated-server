/* ---------------------------------
 * ATLAS local HTTP server for serving map-related images
 *
 * Version: 1.0
 * Last change: 2018-12-29
 * Author: Kad, kadigan.ksb@gmail.com
 * Released under (CC), CC BY 3.0 or newer
 */

// CONFIG:

// on what port should the server be listening to? (you will need to forward this port, it's TCP)
// NOTE: you only need ONE map server for your entire ATLAS World
var ServerWWWPort = 10000;

// where do you keep the images on disk? (note: replace all \ with / or it won't work!)
var ATLAS_ServerGrid_Folder = 'd:/STEAM/steamapps/common/ATLAS Dedicated Server/ShooterGame/ServerGrid';

// =====================================================================================================
// import requirements
var http  = require ('http');
var fs    = require ('fs');
var url   = require ('url');

function defaultResponse(type, length){
  this['Cache-Control']  = 'no-cache';
  this['Content-Type']   = type;
  this['Content-Length'] = length;
  this['Connection'] = 'Close';
  console.log(this);
};
// =====================================================================================================
// verify the provided path
if ( ATLAS_ServerGrid_Folder.substring(ATLAS_ServerGrid_Folder.length-1) != '/' )
  ATLAS_ServerGrid_Folder = ATLAS_ServerGrid_Folder + '/';
if ( !fs.existsSync(ATLAS_ServerGrid_Folder) ){
  console.log("FATAL: path '" + ATLAS_ServerGrid_Folder + "' doesn't exist or can't be accessed.");
  process.exit();
}
console.log("Serving your ATLAS ServerGrid folder: " + ATLAS_ServerGrid_Folder);

// =====================================================================================================
// main handler
var server = http.createServer (function handler (request, response) {
  var pathname = url.parse(request.url).pathname.substring(1);
  while ( pathname.substring(0, 1) == '/' )
    pathname = pathname.substring(1);
  pathname = pathname.split('/');
  console.log(pathname);
  console.log(request.headers);

  /* see if the file exists - then serve it */
  if ( pathname.length == 1 ){
    pathname = pathname[0];
    if ( pathname != "" ){
      if ( pathname.toLowerCase().match(/^mapimg\.?(png|jpg)?$/i) ){
        console.log(">> MapImg request received from " + request.connection.remoteAddress);
        console.log(">> raw request: " + url.parse(request.url).pathname);
        if(fs.existsSync(ATLAS_ServerGrid_Folder + 'MapImg.jpg')){
          console.log("   Serving: JPG");
          var fileData = fs.readFileSync(ATLAS_ServerGrid_Folder + 'MapImg.jpg');
          response.writeHead(200, new defaultResponse('image/jpeg', fileData.length));
          response.write(fileData);
          response.end();
          console.log("\n\n");
          return;
        }
        console.log("  ERROR: MapImg.jpg not found " + ATLAS_ServerGrid_Folder + ", cannot serve. Aborting.");
        response.writeHead(404);
        response.end(); // can't help you there buddy, sorry :D
        return;
      } else if ( pathname.toLowerCase().match(/^cellimg_[0-9]+\-[0-9]+(\.(png|jpg))?$/i) ){
        // request for CellImg
        console.log(">> CellImg request received from " + request.connection.remoteAddress);
        console.log(">> raw request: " + url.parse(request.url).pathname);
        var CellImg = pathname.toLowerCase().substring(8).split(".")[0].split("-");
        if (fs.existsSync(ATLAS_ServerGrid_Folder + 'CellImg_' + CellImg.join('-') + '.jpg')){
          console.log("   Serving: JPG");
          var fileData = fs.readFileSync(ATLAS_ServerGrid_Folder + 'CellImg_' + CellImg.join('-') + '.jpg');
          response.writeHead(200, new defaultResponse('image/jpeg', fileData.length));
          response.write(fileData);
          response.end();
          console.log("\n\n");
          return;
        } else if (fs.existsSync(ATLAS_ServerGrid_Folder + 'CellImg_' + CellImg.join('-') + '.png')){
          // case for GridEditor-generated CellImg_* images which are, in fact, JPEG files...
          console.log("   Serving: JPG (PNG)");
          var fileData = fs.readFileSync(ATLAS_ServerGrid_Folder + 'CellImg_' + CellImg.join('-') + '.png');
          response.writeHead(200, new defaultResponse('image/jpg', fileData.length));
          response.write(fileData);
          response.end();D
          return;
        }
        console.log("  ERROR: CellImg_" + CellImg.join('-') + ".jpg not found in " + ATLAS_ServerGrid_Folder + ", cannot serve. Aborting.");
        response.writeHead(404);
        response.end(); // can't help you there buddy, sorry :D
        console.log("\n\n");
        return;
      }
    }
  } else if ( pathname.length == 3 ) {
    // this request never comes in, because if you have your SeamlessDataPort forwarded it never has to,
    // and if you don't -- the game client will keep re-requesting MapImg or CellImg_* until cosmic death
    // ... but I left it in for completeness
    console.log(">> in-game map request received from " + request.connection.remoteAddress);
    console.log(">> raw request: " + url.parse(request.url).pathname);
    pathname[2] = pathname[2].split('.')[0];
    if (fs.existsSync(ATLAS_ServerGrid_Folder + '/' + pathname.join('/') + '.png')){
      console.log("   Serving: PNG");
      var fileData = fs.readFileSync(ATLAS_ServerGrid_Folder + '/' + pathname.join('/') + '.png');
      response.writeHead(200, new defaultResponse('image/jpeg', fileData.length));
      response.write(fileData);
      response.end(); // can't help you there buddy, sorry :D
      console.log("\n\n");
      return;
    }
    console.log("  ERROR: Map slice /" + pathname.join('/') + ".png not found in " + ATLAS_ServerGrid_Folder + ", cannot serve. Aborting.");
    console.log("\n\n");
    response.writeHead(404);
    response.end(); // can't help you there buddy, sorry :D
    console.log("\n\n");
    return;
  }

  // any other requests are treated as unrecognized and silently ignored
  console.log("UNRECOGNIZED REQUEST received from " + request.connection.remoteAddress);
  console.log("Raw Request:");
  console.log(pathname);
  console.log("\n\n");
  response.writeHead(400);
  response.end();
});

// =====================================================================================================
// start the server
console.log ('Listening on port ' + ServerWWWPort);
server.listen (ServerWWWPort);