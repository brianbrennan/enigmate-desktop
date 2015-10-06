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

mapFileTree(FILE_PATH);



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

function mapFileTree(s){
	fs.readdir(s, function(err, f){//gets files currently in directory
		if(err)
			files[0] = "Something Went Wrong";
		else
			files = f;

		for(var i = 0; i < files.length; i++){
			if(fs.lstatSync(s).isDirectory()){
				mapFileTree(s + "/" + files[i]);
			} else {
				console.log(files[i]);
			}
		}

		return;

	});
}

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
