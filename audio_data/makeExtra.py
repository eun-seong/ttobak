import os
import glob

extras = glob.glob('raw/extra*')

for extra in extras:
    src = extra
    target = extra.split('.')[0].replace('raw', 'data/extra') + '.wav'
    command = 'ffmpeg -y -i {} {}'.format(src, target)
    os.system(command)
