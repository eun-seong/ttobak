import librosa
import glob
import soundfile as sf
import numpy as np
import librosa.display
from matplotlib import pyplot as plt

files = glob.glob('raw/*.wav')
for file in files:
    basename = file.split('raw')[1][1:-4]
    print(basename)

    signal, sample_rate = librosa.load(file, sr=48000)

    start = 0
    end = 0

    for idx, el in enumerate(signal):
        if el >= 0.05:
            start = idx - 100
            break

    for idx, el in enumerate(signal[::-1]):
        if el >= 0.05:
            end = (len(signal) - idx) + 200
            break
    signal = signal[start:end]
    sf.write('refined/' + basename + '.wav', signal, sample_rate)
