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

	var count = 0;
		var load_id = setInterval(function(){
			var ran = Math.random() * (126 - 33) + 33;
			document.getElementById('e').innerHTML = String.fromCharCode(ran);

			ran = Math.random() * (126 - 33) + 33;
			document.getElementById('i').innerHTML = String.fromCharCode(ran);

			ran = Math.random() * (126 - 33) + 33;
			document.getElementById('m').innerHTML = String.fromCharCode(ran);

			ran = Math.random() * (126 - 33) + 33;
			document.getElementById('t').innerHTML = String.fromCharCode(ran);

			if (count % 10 == 0) {
				var ran = Math.random() * (126 - 33) + 33;
				document.getElementById('n').innerHTML = String.fromCharCode(ran);

				ran = Math.random() * (126 - 33) + 33;
				document.getElementById('g').innerHTML = String.fromCharCode(ran);

				ran = Math.random() * (126 - 33) + 33;
				document.getElementById('a').innerHTML = String.fromCharCode(ran);

				ran = Math.random() * (126 - 33) + 33;
				document.getElementById('e2').innerHTML = String.fromCharCode(ran);
			}

			count++;
		},100);

	fs.readFile(FILE_PATH + files[num], function(err, data){
		
		if(err)
			loadedFile = err;
		else
			loadedFile = data.toString();

		s('.main-view .empty').css('display','none');
		s('.main-view .content pre').innerHtml(loadedFile);


		var pre_content = s('pre').innerHtml()[0];
		s('.main-view .content pre').innerHtml(pre_content.replace(/^(.*)$/mg, "<span class=\"line\">$1</span>"));
		
		loading = false;
		clearInterval(load_id);


	});
}
