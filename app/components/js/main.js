//------------------------------------------Configuration

var remote 	= require('remote');
var fs 		= require('fs');
var Enigma 	= require('enigma.js');

var e = new Enigma({
	sequence: 'ascii',
	rotorSettings: 'Welcome ToTheJugleWeGot99Problems',
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
			if(fs.lstatSync(FILE_PATH + files[i]).isDirectory()){
				s('.sidebar ul').insert("<li value=\"" + i +"\" class=\"directory\">" + files[i] + "</li>");
			} else {
				s('.sidebar ul').insert("<li value=\"" + i +"\">" + files[i] + "</li>");
			}

		}

		s('.sidebar ul li:not(.directory)').on('click', function(e){
			s('.sidebar ul li:not(.directory)').removeClass();
			s(this).addClass('active');
			loadFile(s(this).attr('value')[0]);
		});

		s('.sidebar .directory').on('click', function(e){
			//animate and show
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

s('#encrypt-file').on('click', function(event){

	var m = e.encrypt(active_file);

	fs.writeFile(FILE_PATH + '/encrypted.ej', m, function(err){

		if(err)
			console.log(err);


	});
});

s('#decrypt-file').on('click', function(event){

	var m = e.decrypt(active_file);

	fs.writeFile(FILE_PATH + '/decrypted.txt', m, function(err){

		if(err)
			console.log(err);


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
