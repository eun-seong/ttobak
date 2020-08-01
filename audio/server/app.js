const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const shell = require('shelljs');
const formidable = require('formidable');

const PORT = 8080;

const app = express();
app.use(express.static('public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


const responseError = (req, res) => {
	res.json({request: req, status: 'fail'});
}

const form = formidable();

app.post('/api/update/user', (req,res) => {
	form.parse(req, (err, fields, files) => {
		try {
			const uid = fields.uid;
  		const user = fields.user;
  		const gender = fields.gender;

  		if (uid === undefined || user === undefined || gender === undefined) throw "ParameterError";

  		const line = `${uid}|${user}|${gender}\n`;

  		fs.appendFile('../../data/AUDIO_INFO', line, function (err) {
  			if (err) throw err;

  			res.json({request: '/api/update/user', status: 'ok'});
  		})
		} catch (Error) {
			responseError('/api/update/user', res);
		}
	});
});

app.post('/api/update/transcript', (req,res) => {
	form.parse(req, (err, fields, files) => {
		try {
			const transcript = fields.transcript;
			const course = fields.course;

			if (transcript === undefined || course === undefined) throw "ParameterError";
  		if (shell.exec(`cd ../scripts; python3 makeData.py "${transcript}" ../../model/lm ../../data/${course}`).code !== 0) throw "ExecutionError";

			res.json({request: '/api/update/transcript', status: 'ok'});
		} catch (Error) {
			responseError('/api/update/transcript', res);
		}
		
	});
});

app.post('/api/score', (req,res) => {
	form.parse(req, (err, fields, files) => {
		try {
			const course = fields.course;
  		const user = fields.user;

  		if (course === undefined || user === undefined) throw "ParameterError";

  		const oldpath = files.file.path;
  		const newpath = 'temp/raw/' + files.file.name;
			const resultpath = 'temp/result/' + files.file.name + '.txt';

  		fs.rename(oldpath, newpath, (err) => {
  			if (err) throw err;
  			if (shell.exec(`cd ..; ./audio2pron.sh ${course} ${user} ${files.file.name}`).code !== 0) throw "ExecutionError";

  			fs.readFile(resultpath, 'utf8', (err, data) => {
					if (err) throw err;

					res.json({request: '/api/score', course: course, user: user, status: 'ok', score: data});
					
				});

  			
  		});
		} catch (Error) {
			responseError('/api/score', res);
		}
	});
});

app.post('/api/segscore', (req,res) => {
	form.parse(req, (err, fields, files) => {
		try {
			const transcript = fields.transcript;

			if (transcript === undefined) throw "ParameterError";

  		const oldpath = files.file.path;
  		const newpath = 'temp/raw/' + files.file.name;
  		const resultpath = 'temp/result/' + files.file.name + '.txt';

  		fs.rename(oldpath, newpath, (err) => {
  			if (err) throw err;
  			if (shell.exec(`cd ..; ./seg_and_audio2pron.sh "${transcript}" ${files.file.name}`).code !== 0) throw "ExecutionError";

  			fs.readFile(resultpath, 'utf8', (err, data) => {
					if (err) throw err;

					res.json({request: '/api/segscore', status: 'ok', score: data});
				});
  			
  		});
		} catch (Error) {
			responseError('/api/segscore', res);
		}
		
	});
});


app.get('/', (req,res) => {
	res.writeHead(299, {"Content-Type": "text/html"});
	fs.createReadStream("./public/index.html").pipe(res);
});

app.get('/api', (req,res) => {
	res.writeHead(299, {"Content-Type": "text/html"});
	fs.createReadStream("./public/api.html").pipe(res);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});