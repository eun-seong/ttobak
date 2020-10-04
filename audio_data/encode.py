import os

from pathlib import Path

wavs = [str(el.resolve()) for el in Path('data').rglob('*.wav')]
for wav in wavs:
    src = wav
    target = wav[:-3] + 'mp3'
    os.system('ffmpeg -y -i {} {}'.format(src, target))
