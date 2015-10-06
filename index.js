var app 			= require('app');
var BrowserWindow 	= require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {

  if (process.platform != 'darwin') {
    app.quit();
  }
});


app.on('ready', function() {
 
  mainWindow = new BrowserWindow({width: 800, height: 600, center: true, "auto-hide-menu-bar":true, frame: false});

  
  mainWindow.loadUrl('file://' + __dirname + '/app/index.html');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});