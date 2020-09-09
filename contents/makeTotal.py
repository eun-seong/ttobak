import glob
files = glob.glob('*/*/*.txt')
files = [el for el in files if 'readme' not in el and 'noise' not in el]

noise_files = glob.glob('*/*/*.txt')
noise_files = [el for el in noise_files if 'noise' in el]

files.sort()
noise_files.sort()

results = {}
noises = {}

for txt in files:
    with open(txt, 'r') as f:
        lines = f.readlines()
        lines = [el for el in lines if el != '\n']
        if 'poem' in txt:
            lines = lines[1:]
        for idx, line in enumerate(lines):
            key = '{0}_{1:04d}'.format(txt.split('.')[0], idx+1)
            print(key + ' ' + line.strip())
            results[key] = line.strip()

with open('total.txt', 'w') as f:
    for el in results:
        f.write('{} {}\n'.format(el, results[el]))

for txt in noise_files:
    with open(txt, 'r') as f:
        lines = f.readlines()
        lines = [el for el in lines if el != '\n']
        for idx, line in enumerate(lines):
            key = '{0}_{1:04d}'.format(txt.split('.')[0], idx+1)
            print(key + ' ' + line.strip())
            noises[key] = line.strip()

with open('noises.txt', 'w') as f:
    for el in noises:
        f.write('{} {}\n'.format(el, noises[el]))

values = list(set(results.values()))
with open('script.txt', 'w') as f:
    for idx, val in enumerate(values):
        f.write('script_{0:04d} {1}\n'.format(idx+1, val))

linked = {}
for result in results:
    idx = values.index(results[result])
    linked[result] = 'script_{0:04d}'.format(idx)

with open('linked.txt', 'w') as f:
    for el in linked:
        f.write('{} {}\n'.format(el, linked[el]))
