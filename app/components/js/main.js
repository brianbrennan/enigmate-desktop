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

s('.sidebar .dir').on('click', function(e){
});

s('#decrypt-file').on('click', function(event){

	var m = e.decrypt(active_file);

	fs.writeFile(FILE_PATH + '/decrypted.txt', m, function(err){

		if(err)
			console.log(err);


	});
});

//------------------------File and Folder Drop

document.addEventListener('dragover',function(event){
	event.preventDefault();
	return false;
},false);

document.addEventListener('drop',function(event){
	event.preventDefault();
	return false;
},false);

var dropzone = document.getElementById('dropzone');

dropzone.ondrop = function(e){
	var temp = [];

	for(var i = 0; i < e.dataTransfer.items.length; i++){
		temp.push(e.dataTransfer.items[i].getAsFile());

		files.push(mapFileTree(temp[i].path));
		console.log(files);
	}

	for(var i = 0; i < files.length; i++){
		var ih = s('.sidebar ul:nth-child(' + (i * 2 + 1) + 'n)').innerHtml();
		console.log(ih);
		s('.sidebar ul:nth-child(' + (i * 2 + 1) + 'n)').innerHtml(ih + listFiles(files[i])).css('opacity','1');
	}

	s('.dir').on('click', function(e){
		if(s(this).hasClass('open')[0]){
			s(s(this).selector + ' + ul').css('opacity', '0');
			s(s(this).selector + ' + ul').css('display', 'none');
			s(this).removeClass('open');
		} else {			
			s(s(this).selector + ' + ul').css('display', 'block');
			s(s(this).selector + ' + ul').css('opacity', '1');
			s(this).addClass('open');
		}

	});

	fs.writeFile('./app/temp/temp.txt',files,function(err){

	});

}

//----------------------------------------------Functions

function mapFileTree(s){

	if(fs.lstatSync(s).isDirectory()){

		var o = {};

		o.name = s.substr(s.lastIndexOf('\\') + 1,s.length);

		s = s + "\\";
		var d = fs.readdirSync(s);

		o.path = s;
		o.type = "dir";
		o.files = [];

		for(var i = 0; i < d.length; i++){
			o.files.push(mapFileTree(s + d[i]));
		}
		return o;
	} else {
		var o = {};

		o.name = s.substr(s.lastIndexOf('\\') + 1,s.length);

		o.path = s;
		o.type = "file";
		return o;
	}
}

function listFiles(f){
	if(f.type == 'file'){
		return "<li>" + f.name + "</li>";
	} else {
		var m = "<li class=\"dir\">" + f.name + "</li><ul>";
		for(var i = 0; i < f.files.length; i++){
			m = m + listFiles(f.files[i]);
		}

		m = m + "</ul>";
		return m;
	}
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
