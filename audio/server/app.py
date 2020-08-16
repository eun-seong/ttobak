from sanic import Sanic
from sanic import response

import subprocess
import time
import os
import json

app = Sanic(__name__)

ALLOWED_EXTENSIONS = set(['mp3', 'm4a', 'flac', 'wav', 'aac', 'ogg', 'wma', 'aac', '3gp'])

PATH = {
    'PATH': "/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin"
}

ERROR_CODE = {
    0: 'Success',
    1: 'Insufficient Parameters',
    2: 'Parameter is not filled',
    3: 'Invalid extensions',
    4: 'Processing error',
    5: 'Invalid Parameters',
}

@app.route('/test')
async def test(request):
    time.sleep(5)
    return await response.file('templates/api.html')

@app.route('/')
async def index(request):
    return await response.file('templates/index.html')

@app.route('/api')
async def api_index(request):
    return await response.file('templates/api.html')

@app.route('/api/user/update', methods=['POST'])
async def update_user(request):
    if "uid" not in request.form or \
        "name" not in request.form or \
        "gender" not in request.form:
        return error(request.path, 1)

    uid = request.form.get('uid')
    name = request.form.get('name')
    gender = request.form.get('gender')

    if uid == '' or name == '' or gender == '':
        return error(request.path, 2)
    if gender != 'm' and gender != 'f':
        return error(request.path, 5)

    line = '{}|{}|{}\n'.format(uid, name, gender)

    audio_info = open('../../data/AUDIO_INFO', 'a')
    audio_info.write(line)
    audio_info.close()

    return response.json({'request': request.path, 'status': 'Success'})

@app.route('/api/transcript/update', methods=['POST'])
async def update_transcript(request):
    if 'transcript' not in request.form or \
        'course' not in request.form:
        return error(request.path, 1)

    transcript = request.form.get('transcript')
    course = request.form.get('course')

    if transcript == '' or course == '':
        return error(request.path, 2)

    lm = '../../model/lm'
    target = '../../data/{}'.format(course)
    try:
        subprocess.run('python3 makeData.py "{}" {} {}'.format(transcript, lm, target), shell=True, check=True, cwd=os.path.abspath('../scripts'))
    except:
        return error(request.path, 4)

    return response.json({'request': request.path, 'status': 'Success'})

@app.route('/api/score', methods=['POST'])
async def score(request):
    if "course" not in request.form or \
        "user" not in request.form or \
        "file" not in request.files:
        return error(request.path, 1)

    course = request.form.get('course')
    user = request.form.get('user')
    file = request.files.get('file')

    if course == '' or user == '':
        return error(request.path, 2)

    filename = make_filename(file.name)
    if filename == '':
        return error(request.path, 3)

    f = open('temp/raw/' + filename, 'wb')
    f.write(file.body)
    f.close()

    subprocess.run('./audio2pron.sh {} {} {}'.format(course, user, filename), shell=True, cwd=os.path.abspath('..'))

    if not os.path.isfile('temp/result/{}.json'.format(filename)):
        return error(request.path, 4)

    result_file = open('temp/result/{}.json'.format(filename), 'r')
    result = json.load(result_file)
    result_file.close()

    return response.json({'request': request.path, 'status': 'Success', 'score': float(result['score']), 'phone_score': float(result['phone_score']), 'speed_score': float(result['speed_score']), 'transcript': result['transcript'], 'correct': result['correct'], 'student': result['student'], 'student_time': result['student_time']})

@app.route('/api/segscore', methods=['POST'])
async def seg_score(request):
    if 'transcript' not in request.form or \
        'file' not in request.files:
        return error(request.path, 1)

    transcript = request.form.get('transcript')
    file = request.files.get('file')

    if transcript == '':
        return error(request.path, 2)

    filename = make_filename(file.name)
    if filename == '':
        return error(request.path, 3)
    
    f = open('temp/raw/' + filename, 'wb')
    f.write(file.body)
    f.close()

    subprocess.run('./seg_and_audio2pron.sh "{}" {}'.format(transcript, filename), shell=True, cwd=os.path.abspath('..'))

    if not os.path.isfile('temp/result/{}.json'.format(filename)):
        return error(request.path, 4)

    result_file = open('temp/result/{}.json'.format(filename), 'r')
    result = json.load(result_file)
    result_file.close()

    return response.json({'request': request.path, 'status': 'Success', 'score': float(result['score']), 'phone_score': float(result['phone_score']), 'speed_score': float(result['speed_score']), 'transcript': result['transcript'], 'transcript': result['transcript'], 'correct': result['correct'], 'student': result['student'], 'student_time': result['student_time']})


def make_filename(filename):
    millis = int(round(time.time() * 1000))
    ext = filename.rsplit('.', 1)[1]

    if ext not in ALLOWED_EXTENSIONS:
        return ''

    return '{}.{}'.format(str(millis), ext)

def error(req, err):
    return response.json({'request': req, 'status': 'Fail', 'error': ERROR_CODE[err]})

if __name__ == '__main__':
    app.run()
