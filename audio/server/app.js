var http = require('http'); 
var fs = require('fs');
var qs = require('querystring');
var formidable = require('formidable');
var shell = require('shelljs');

const responseError = (response, request) => {
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(JSON.stringify({status: 'fail'}));
}

var server = http.createServer((request,response) => { 
	console.log(request.method, request.url);

	if (request.method === 'POST' && request.url === '/api/update/user') {
		const form = formidable();

  	form.parse(request, (err, fields, files) => {
  		try {
  			const uid = fields.uid;
	  		const user = fields.user;
	  		const gender = fields.gender;

	  		const line = `${uid}|${user}|${gender}\n`;

	  		fs.appendFile('../../data/AUDIO_INFO', line, function (err) {
	  			if (err) throw err;

	  			response.writeHead(200, {"Content-Type": "application/json"});
  				response.end(JSON.stringify({request: '/api/update/user', status: 'ok'}));
	  		})
  		} catch (Error) {
  			responseError(response, '/api/update/user');
  		}
  	});
	} else if (request.method === 'POST' && request.url === '/api/update/transcript') {
		const form = formidable();

  	form.parse(request, (err, fields, files) => {
  		try {
  			const transcript = fields.transcript;
  			const course = fields.course;

	  		if (shell.exec(`cd ../scripts; python3 updateData "${transcript}" ../../model/lm ../../data/${course}`).code !== 0) throw "ExecutionError";

  			response.writeHead(200, {"Content-Type": "application/json"});
				response.end(JSON.stringify({request: '/api/update/transcript', status: 'ok'}));
  		} catch (Error) {
  			responseError(response, '/api/update/transcript');
  		}
  		
  	});
	} else if (request.method === 'POST' && request.url === '/api/score') {
		const form = formidable();

  	form.parse(request, (err, fields, files) => {
  		try {
  			const course = fields.course;
	  		const user = fields.user;

	  		const oldpath = files.file.path;
	  		const newpath = 'temp/raw/' + files.file.name;
				const resultpath = 'temp/result/' + files.file.name + '.txt';

	  		fs.rename(oldpath, newpath, (err) => {
	  			if (err) throw err;
	  			if (shell.exec(`cd ..; ./audio2pron.sh ${course} ${user} ${files.file.name}`).code !== 0) throw "ExecutionError";

	  			fs.readFile(resultpath, 'utf8', (err, data) => {
  					if (err) throw err;

  					response.writeHead(200, {"Content-Type": "application/json"});
  					response.end(JSON.stringify({request: '/api/score', course: course, user: user, status: 'ok', score: data}));
  					
  				});

	  			
	  		});
  		} catch (Error) {
  			responseError(response, '/api/score');
  		}

  		
  	});
	} else if (request.method === 'POST' && request.url === '/api/segscore') {
		const form = formidable();

  	form.parse(request, (err, fields, files) => {
  		try {
  			const transcript = fields.transcript;

	  		const oldpath = files.file.path;
	  		const newpath = 'temp/raw/' + files.file.name;
	  		const resultpath = 'temp/result/' + files.file.name + '.txt';

	  		fs.rename(oldpath, newpath, (err) => {
	  			if (err) throw err;
	  			if (shell.exec(`cd ..; ./seg_and_audio2pron.sh "${transcript}" ${files.file.name}`).code !== 0) throw "ExecutionError";

	  			fs.readFile(resultpath, 'utf8', (err, data) => {
  					if (err) throw err;

  					response.writeHead(200, {"Content-Type": "application/json"});
  					response.end(JSON.stringify({request: '/api/segscore', status: 'ok', score: data}));
  				});
	  			
	  		});
  		} catch (Error) {
  			responseError(response, '/api/segscore');
  		}
  		
  	});
	} else if (request.url === '/api') {
		response.writeHead(299, {"Content-Type": "text/html"});
		fs.createReadStream("./api.html").pipe(response);
	} else if (request.url === '/') {
		response.writeHead(200, {"Content-Type": "text/html"});
		fs.createReadStream("./index.html").pipe(response);
	} else {
		response.statusCode = 404;
		response.end();
	}
});

server.listen(8080, function(){ 
    console.log('Server is running...');
});
