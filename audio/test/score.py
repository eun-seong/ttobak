import os, glob

results = glob.glob('result/*.txt')

phone_score = 0.0
word_score = 0.0
text_score = 0.0

results.sort()

for i in range(0, 247):
    file = open(results[i])
    score = float(file.readline().strip())
    file.close()

    text_file = open('data/0000{0:04d}/text'.format(i))
    text = text_file.readline().strip()
    text_file.close()

    if i >= 0 and i < 47: phone_score += score
    elif i >= 47 and i < 147: word_score += score
    else: text_score += score

    print(i, text, score)

phone_score = phone_score / 47.0
word_score = word_score / 100.0
text_score = text_score / 100.0

print('\n----------------------------------')
print('Average Score')
print('----------------------------------\n')
print('Tested Phone-Level Scripts : 47')
print('Tested Word-Level Scripts : 100')
print('Tested Sentence-Level Scripts : 100\n')
print('Phone-Level Script Score: ', phone_score)
print('Word-Level Scripts: ', word_score)
print('Sentence-Level Scripts:', text_score)
