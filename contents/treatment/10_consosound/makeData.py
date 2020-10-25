chosung = (
	"ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ",
	"ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ",
	"ㅌ", "ㅍ", "ㅎ")

jungsung = (
	"ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ",
	"ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ",
	"ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ")

jongsung = (
	"", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ",
	"ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ",
	"ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ",
	"ㅋ", "ㅌ", "ㅍ", "ㅎ")

def hangeulJoin(inputlist):
	"""분해된 한글 낱자들을 리스트로 입력받아, 이를 조합하여 모아쓰기된 문장으로 바꾼다."""
	result = ""
	cho, jung, jong = 0, 0, 0
	inputlist.insert(0, "")
	while len(inputlist) > 1:
		if inputlist[-1] in jongsung:
			if inputlist[-2] in jungsung:
				jong = jongsung.index(inputlist.pop())
			else:
				result += inputlist.pop()
		elif inputlist[-1] in jungsung:
			if inputlist[-2] in chosung:
				jung = jungsung.index(inputlist.pop())
				cho = chosung.index(inputlist.pop())
				result += chr(0xAC00 + ((cho*21)+jung)*28+jong)
				cho, jung, jong = 0, 0, 0
			else:
				result += inputlist.pop()
		else:
			result += inputlist.pop()
	else:
		return result[::-1]

def moasseugi(inputtext):
	"""입력된 문장에 있는 모든 풀어쓰기된 한글을 모아쓰기로 바꾼다."""
	t1 = []
	for i in inputtext:
		t1.append(i)
	return hangeulJoin(t1)

import random

data = [['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ'], ['ㅂ', 'ㄷ', 'ㄱ', 'ㅃ', 'ㄸ', 'ㄲ', 'ㅍ', 'ㅌ', 'ㅋ'], ['ㅈ', 'ㅅ', 'ㅉ', 'ㅆ', 'ㅊ', 'ㅎ']]

for i, group in enumerate(data):
    cnt = 0
    for j in range(len(group)):
        for k in range(j+1, len(group)):
            cnt += 1
            v_idx = int(random.random() * len(jungsung))
            v = jungsung[v_idx]
            c1 = moasseugi(group[j] + v)
            c2 = moasseugi(group[k] + v)
            ans = c1
            if random.random() > 0.5:
                c1, c2 = c2, c1
            with open('text_{0:02d}_{1:04d}.txt'.format(i+1, cnt), 'w') as f:
                f.write('{}\n{}\n{}\n'.format(ans, c1, c2))

data_sum = sum(data, [])
s = set()

while len(s) != 50:
    x = int(random.random() * len(data_sum))
    y = int(random.random() * len(data_sum))
    if x == y: continue
    if x > y:
        x, y = y, x
    s.add((x, y))

question = list(s)
for i in range(50):
    v_idx = int(random.random() * len(jungsung))
    v = jungsung[v_idx]
    c1 = moasseugi(data_sum[question[i][0]] + v)
    c2 = moasseugi(data_sum[question[i][1]] + v)
    ans = c1
    if random.random() > 0.5:
        c1, c2 = c2, c1
    with open('text_{0:02d}_{1:04d}.txt'.format(4, i+1), 'w') as f:
        f.write('{}\n{}\n{}\n'.format(ans, c1, c2))

jong_data = {'ㄱ': ['ㄱ', 'ㄲ', 'ㅋ'], 'ㄴ': ['ㄴ'], 'ㄷ': ['ㄷ', 'ㅌ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅎ'], 'ㄹ': ['ㄹ'], 'ㅁ': ['ㅁ'], 'ㅂ': ['ㅂ', 'ㅍ'], 'ㅇ': ['ㅇ']}

cnt = 0
keys = list(jong_data.keys())
for i in range(len(keys)):
    i_jong = keys[i]
    for j in range(i+1, len(keys)):
        j_jong = keys[j]
        for el1 in jong_data[i_jong]:
            for el2 in jong_data[j_jong]:
                cnt += 1
                c1 = moasseugi('ㅇㅏ' + el1)
                c2 = moasseugi('ㅇㅏ' + el2)
                ans = c1
                if random.random() > 0.5:
                    c1, c2 = c2, c1
                with open('text_{0:02d}_{1:04d}.txt'.format(5, cnt), 'w') as f:
                    f.write('{}\n{}\n{}\n'.format(ans, c1, c2))

word_text = '''부채 수채
숙제 국제
먼지 번지
친구 인구
파랑 자랑
가방 다방
태양 대양
하마 가마
오목 고목
반지 단지
허리 머리
딸기 찰기
짝수 악수
쪽지 복지
노을 고을
동전 종전
치약 삐약
두부 주부
연수 변수
구리 무리
지수 치수
모자 포자
노래 고래
고기 모기
수비 구비
피자 비자
티비 시비
적성 먹성
승기 등기
간수 만수
문어 묻어
악기 암기
온수 옥수
전기 절기
돌기 독기
국수 군수
송어 속어
엄마 얼마
실학 신학
목수 몰수
감사 간사
홀수 혼수
낚시 난시
갈색 각색
극장 금장
감소 강소
영어 연어
답장 닭장
신비 식비
한자 학자'''

word_data = word_text.split('\n')

for i, d in enumerate(word_data):
    text = d.split(' ')
    c1 = text[0]
    c2 = text[1]
    if random.random() > 0.5:
        ans = c1
    else:
        ans = c2
    with open('text_06_{0:04d}.txt'.format(i+1), 'w') as f:
        f.write('{}\n{}\n{}\n'.format(ans, c1, c2))
