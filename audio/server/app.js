var http = require('http'); 
var fs = require('fs');
var qs = require('querystring');
var formidable = require('formidable');

var server = http.createServer((request,response) => { 
	console.log(request.method, request.url);
	if (request.method === 'POST' && request.url === '/submit') {
		const form = formidable();

  	form.parse(request, (err, fields, files) => {
  		const transcript = fields.transcript;

  		const oldpath = files.file.path;
  		const newpath = '/home/marble/nodejs/temp/' + files.file.name;

  		fs.rename(oldpath, newpath, (err) => {
  			if (err) throw err;
  			response.writeHead(200, {"Content-Type": "application/json"});
  			response.end(JSON.stringify({transcript: transcript, file: files.file.name, score: 55.0}));
  		})
  	});
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
