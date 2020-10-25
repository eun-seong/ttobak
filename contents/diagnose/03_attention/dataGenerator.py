import glob, os
import random

audio_files = glob.glob('*.wav')
noises = [el for el in audio_files if 'noise' in el]
audio_files = [el for el in audio_files if 'script' in el]

for audio in audio_files:
    random_noises = random.choices(noises, k=5)
    command = 'ffmpeg -i {} -i {} -i {} -i {} -i {} -i {} -filter_complex "[0:a][1:a][2:a][3:a][4:a][5:a]join=inputs=6:channel_layout=5.1[a]" -map "[a]" output.wav'
    
