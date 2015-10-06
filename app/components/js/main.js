//------------------------------------------Configuration

var remote = require('remote');
var fs 				= require('fs');

var FILE_PATH		= './app/files/';
var files = [];

var loading = false;
var maxed = false;

//------------------------------------------Initialization

fs.readdir(FILE_PATH, function(err, f){//gets files currently in directory
	if(err)
		files[i] = "Something Went Wrong";
	else{
		files = f;

		for(var i = 0; i < files.length; i++){
			s('.sidebar ul').insert("<li value=\"" + i +"\">" + files[i] + "</li>");
		}

		s('.sidebar ul li').on('click', function(e){
			s('.sidebar ul li').removeClass();
			s(this).addClass('active');
			loadFile(s(this).attr('value')[0]);
		});
	}

});

s('#close-window').on('click', function(e){
	var wind = remote.getCurrentWindow();
	wind.close(); 
});

s('#maximize-window').on('click', function(e){
	var wind = remote.getCurrentWindow();
	
	if(maxed){
		wind.unmaximize();
		maxed = false;
	} else {
		wind.maximize();
		maxed = true;
	}
});

s('#minimize-window').on('click', function(e){
	var wind = remote.getCurrentWindow();
	
	wind.minimize();
});

//----------------------------------------------Functions

function loadFile(n){
	loading = true;
	var num = new Number(n);

	var loadedFile;

	fs.readFile(FILE_PATH + files[num], function(err, data){
		if(err)
			loadedFile = err;
		else
			loadedFile = data.toString();

		s('.main-view .empty').css('display','none');
		s('.main-view .content pre').innerHtml(loadedFile);
		loading = false;
	});
}