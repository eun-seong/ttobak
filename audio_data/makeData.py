import os

with open('linked.txt', 'r') as f:
    lines = f.readlines()
    for line in lines:
        target, src = line.strip().split(' ')

        target = 'data/' + target + '.wav'
        src = 'raw/' + src + '.m4a'
        command = 'ffmpeg -y -i {} {}'.format(src, target)
        os.system(command)
