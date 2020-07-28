import sys
import os

def convert(dirs, lm):
    for d in dirs:
        basename = os.path.basename(d)
        trans = '{}/{}.trans.txt'.format(d, basename)
        prons = '{}/{}.prons.txt'.format(d, basename)
        os.system('./updateSegmentation.sh {} {}'.format(d, lm))
        os.system('python3 genPhoneSeq.py {} {}'.format(trans, prons))
        print('Convert: {} completed'.format(basename))

if __name__ == '__main__':
    if len(sys.argv) == 2:
        target = '/home/marble/PycharmProjects/data'
        dirs = [f.path for f in os.scandir(target) if f.is_dir()]
    elif len(sys.argv) == 3:
        dirs = [sys.argv[2]]
    else:
        print('Wrong Argument Given')
        print('Correct: python3 makeData.py <language-model> <target-directory>')
        print('** <target-directory> is optional **')
        sys.exit()
    lm = sys.argv[1]
    convert(dirs, lm)
