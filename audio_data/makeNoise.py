import glob
import os
import random

noises = glob.glob('raw/noise_*')
scripts = glob.glob('raw/script_*')

noises.sort()
scripts.sort()

scripts = scripts[199:249]

for noise in noises:
    command = 'ffmpeg -y -i {} -filter:a "volume=0.1" {}.wav'.format(noise, noise.replace('noise', 'reduced').split('.')[0])
    os.system(command)

reduced = glob.glob('raw/reduced_*')
reduced.sort()

for i in range(1, 6):
    for j in range(1, 11):
        idx = (i-1) * 10 + (j-1)
        random_noises = random.sample(reduced, k=4)
        for level in range(0, 5):
            filename = 'data/diagnose/03_attention/atten_{0:02d}_{1:02d}_{2:04d}.wav'.format(i, level+1, j)
            inputs = ' -i '.join([scripts[idx]] + random_noises[:level])
            command = 'ffmpeg -y -i {0} -filter_complex amix=inputs={1}:duration=first:dropout_transition=0,volume={1} {2}'.format(inputs, level+1, filename)
            os.system(command)
