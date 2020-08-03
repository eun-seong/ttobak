from flask import Flask
from flask import render_template
from flask import request
from flask import jsonify
from werkzeug.utils import secure_filename

import subprocess
import time
import os

app = Flask(__name__)

ALLOWED_EXTENSIONS = set(['mp3', 'm4a', 'flac', 'wav', 'aac', 'ogg', 'wma', 'aac', '3gp'])

ERROR_CODE = {
    0: 'Success',
    1: 'Insufficient Parameters',
    2: 'Parameter is not filled',
    3: 'Invalid extensions',
    4: 'Processing error',
    5: 'Invalid Parameters',
}


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api')
def api_index():
    return render_template('api.html')

@app.route('/api/update/user', methods=['POST'])
def update_user():
    if "uid" not in request.form or \
        "user" not in request.form or \
        "gender" not in request.form:
        return error(request.path, 1)

    uid = request.form['uid']
    user = request.form['user']
    gender = request.form['gender']

    if uid == '' or user == '' or gender == '':
        return error(request.path, 2)
    if gender != 'm' and gender != 'f':
        return error(request.path, 5)

    line = '{}|{}|{}\n'.format(uid, user, gender)

    audio_info = open('../../data/AUDIO_INFO', 'a')
    audio_info.write(line)
    audio_info.close()

    return jsonify({'request': request.path, 'status': 'Success'})

@app.route('/api/update/transcript', methods=['POST'])
def update_transcript():
    if 'transcript' not in request.form or \
        'course' not in request.form:
        return error(request.path, 1)

    transcript = request.form['transcript']
    course = request.form['course']

    if transcript == '' or course == '':
        return error(request.path, 2)

    lm = '../../model/lm'
    target = '../../data/{}'.format(course)
    child = subprocess.Popen('python3 makeData.py "{}" {} {}'.format(transcript, lm, target), cwd='../scripts')
    returnCode = child.poll()

    if returnCode != 0:
        return error(request.path, 4)

    return jsonify({'request': request.path, 'status': 'Success'})

@app.route('/api/score', methods=['POST'])
def score():
    if "course" not in request.form or \
        "user" not in request.form or \
        "file" not in request.files:
        return error(request.path, 1)

    course = request.form['course']
    user = request.form['user']
    file = request.files['file']

    if course == '' or user == '':
        return error(request.path, 2)

    filename = make_filename(file.filename)
    if filename == '':
        return error(request.path, 3)

    file.save('temp/raw/' + filename)

    log = open('log', 'w')
    subprocess.call(['./audio2pron.sh', course, user, filename], cwd=os.path.abspath('..'), stdout=log)
    log.close()

    if not os.path.isfile('temp/result/{}.txt'.format(filename)):
        return error(request.path, 4)

    result_file = open('temp/result/{}.txt'.format(filename), 'r')
    result = result_file.readline().strip()
    result_file.close()

    return jsonify({'request': request.path, 'status': 'Success', 'score': float(result)})

@app.route('/api/segscore', methods=['POST'])
def seg_score():
    if 'transcript' not in request.form or \
        'file' not in request.files:
        return error(request.path, 1)

    transcript = request.form['transcript']
    file = request.files['file']

    if transcript == '':
        return error(request.path, 2)

    filename = make_filename(file.filename)
    if filename == '':
        return error(request.path, 3)

    file.save('temp/raw/' + filename)

    log = open('log', 'w')
    subprocess.call(['./seg_and_audio2pron.sh', transcript, filename], cwd=os.path.abspath('..'), stdout=log)
    log.close()

    if not os.path.isfile('temp/result/{}.txt'.format(filename)):
        return error(request.path, 4)

    result_file = open('temp/result/{}.txt'.format(filename), 'r')
    result = result_file.readline().strip()
    result_file.close()

    return jsonify({'request': request.path, 'status': 'Success', 'score': float(result)})


def make_filename(filename):
    millis = int(round(time.time() * 1000))
    ext = filename.rsplit('.', 1)[1]

    if ext not in ALLOWED_EXTENSIONS:
        return ''

    return '{}.{}'.format(str(millis), ext)

def error(req, err):
    return jsonify({'request': req, 'status': 'Fail', 'error': ERROR_CODE[err]})

if __name__ == '__main__':
    app.run(debug=True)
