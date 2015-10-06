var app 			= require('app');
var BrowserWindow 	= require('browser-window');
var path 			= require('path');
var cp 				= require('child_process');

var mainWindow = null;

var handleSquirrelEvent = function() {
   if (process.platform != 'win32') {
      return false;
   }

   function executeSquirrelCommand(args, done) {
      var updateDotExe = path.resolve(path.dirname(process.execPath), 
         '..', 'update.exe');
      var child = cp.spawn(updateDotExe, args, { detached: true });
      child.on('close', function(code) {
         done();
      });
   };

   function install(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--createShortcut", target], done);
   };

   function uninstall(done) {
      var target = path.basename(process.execPath);
      executeSquirrelCommand(["--removeShortcut", target], done);
   };

   var squirrelEvent = process.argv[1];
   switch (squirrelEvent) {
      case '--squirrel-install':
         install(app.quit);
         return true;
      case '--squirrel-updated':
         install(app.quit);
         return true;
      case '--squirrel-obsolete':
         app.quit();
         return true;
      case '--squirrel-uninstall':
         uninstall(app.quit);
         return true;
   }

   return false;
};

if (handleSquirrelEvent()) {
   return;
}

app.on('window-all-closed', function() {

	if (process.platform != 'darwin') {
		app.quit();
	}
});


app.on('ready', function() {

	mainWindow = new BrowserWindow({
		width: 900, 
		height: 600, 
		center: true, 
		"auto-hide-menu-bar":true, 
		frame: false,
		"min-width":750,
		"min-height":500
	});


	mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

});