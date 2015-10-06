//------------------------------------------Configuration

var remote 	= require('remote');
var fs 		= require('fs');
var Enigma 	= require('enigma.js');

var e = new Enigma({
	sequence: 'ascii',
	rotorSettings: '99Taps',
	spaces: true
});

var FILE_PATH		= './app/files/';
var files = [];
var active_file;

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

s('#encrypt-file').on('click', function(e){

	if(e)
		return e;

	fs.readFile('in.txt', function(err, data){
	m = e.encrypt(data.toString());

	fs.writeFile('encrypted.ej', m, function(err){

		m = e.decrypt(m);

		fs.writeFile('out.txt', m, function(err){

		});

	});
});
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

		active_file = loadedFile;

		s('.main-view .empty').css('display','none');
		s('.main-view .content pre').innerHtml(loadedFile);


		var pre_content = s('pre').innerHtml()[0];
		s('.main-view .content pre').innerHtml(pre_content.replace(/^(.*)$/mg, "<span class=\"line\">$1</span>"));

		loading = false;
	});
}
