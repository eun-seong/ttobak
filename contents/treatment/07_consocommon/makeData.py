import re
import random
import sys
"""
    초성 중성 종성 분리 하기
	유니코드 한글은 0xAC00 으로부터
	초성 19개, 중성21개, 종성28개로 이루어지고
	이들을 조합한 11,172개의 문자를 갖는다.
	한글코드의 값 = ((초성 * 21) + 중성) * 28 + 종성 + 0xAC00
	(0xAC00은 'ㄱ'의 코드값)
	따라서 다음과 같은 계산 식이 구해진다.
	유니코드 한글 문자 코드 값이 X일 때,
	초성 = ((X - 0xAC00) / 28) / 21
	중성 = ((X - 0xAC00) / 28) % 21
	종성 = (X - 0xAC00) % 28
	이 때 초성, 중성, 종성의 값은 각 소리 글자의 코드값이 아니라
	이들이 각각 몇 번째 문자인가를 나타내기 때문에 다음과 같이 다시 처리한다.
	초성문자코드 = 초성 + 0x1100 //('ㄱ')
	중성문자코드 = 중성 + 0x1161 // ('ㅏ')
	종성문자코드 = 종성 + 0x11A8 - 1 // (종성이 없는 경우가 있으므로 1을 뺌)
"""
# 유니코드 한글 시작 : 44032, 끝 : 55199
BASE_CODE, CHOSUNG, JUNGSUNG = 44032, 588, 28

# 초성 리스트. 00 ~ 18
CHOSUNG_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

# 중성 리스트. 00 ~ 20
JUNGSUNG_LIST = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']

# 종성 리스트. 00 ~ 27 + 1(1개 없음)
JONGSUNG_LIST = [' ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

def convert(test_keyword):
    split_keyword_list = list(test_keyword)
    #print(split_keyword_list)

    result = list()
    for keyword in split_keyword_list:
        # 한글 여부 check 후 분리
        if re.match('.*[ㄱ-ㅎㅏ-ㅣ가-힣]+.*', keyword) is not None:
            char_code = ord(keyword) - BASE_CODE
            char1 = int(char_code / CHOSUNG)
            result.append(CHOSUNG_LIST[char1])
            #print('초성 : {}'.format(CHOSUNG_LIST[char1]))
            char2 = int((char_code - (CHOSUNG * char1)) / JUNGSUNG)
            result.append(JUNGSUNG_LIST[char2])
            #print('중성 : {}'.format(JUNGSUNG_LIST[char2]))
            char3 = int((char_code - (CHOSUNG * char1) - (JUNGSUNG * char2)))
            if char3==0:
                result.append('#')
            else:
                result.append(JONGSUNG_LIST[char3])
            #print('종성 : {}'.format(JONGSUNG_LIST[char3]))
        else:
            result.append(keyword)
    return result

data_text = '''가방 가위 개구리 개미 고래 나무 나비 남자 너구리 날개 대나무 도끼 동전 두더지 둥지 라면 리코더 만두 망원경 모기 모자 미끄럼틀 바다 바지 반지 배꼽 버스 사과 사탕 서점 손목 쇠똥구리 열쇠 오렌지 오리 우산 운동장 자두 잠자리 조개 주전자 지우개 책 청소기 축구 치약 칫솔 카메라 캥거루 코끼리 키위 커피 타조 태양 탬버린 토끼 토마토 파리 편지 포도 피아노 피터팬 허리 호랑이 하마 연못 햄버거 꽃 꿈 꿩 꿀 땅콩 똥 떡 떡볶이 딸기 빨래 뻐꾸기 뽀뽀 뿌리 쓰레기 씨앗 씨름 쌀 짬뽕 짝수 쪽지 찌개'''
first_text = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
second_text = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']

data = data_text.split(' ')
c_data = {el: convert(el) for el in data}

first_group = {}
for key in c_data:
    first_con = c_data[key][0]
    if first_con in first_group:
        first_group[first_con].append(key)
    else:
        first_group[first_con] = [key]

cnt = 0
for i, d in enumerate(c_data):
    if c_data[d][0] == 'ㅇ': continue
    while True:
        ran_idx = int(random.random() * len(first_text))
        if c_data[d][0] == first_text[ran_idx]: continue
        break
    cnt += 1
    c1 = c_data[d][0]
    c2 = first_text[ran_idx]
    ans = c_data[d][0]
    if random.random() > 0.5:
        c1, c2 = c2, c1
    
    with open('text_01_{0:04d}.txt'.format(cnt), 'w') as f:
        f.write('{}\n{}\n{}\n{}'.format(d, c1, c2, ans))


second_group = {}
for key in c_data:
    second_vow = c_data[key][1]
    if second_vow in second_group:
        second_group[second_vow].append(key)
    else:
        second_group[second_vow] = [key]

cnt = 0
for i, d in enumerate(c_data):
    while True:
        ran_idx = int(random.random() * len(second_text))
        if c_data[d][1] == second_text[ran_idx]: continue
        break
    cnt += 1
    c1 = c_data[d][1]
    c2 = second_text[ran_idx]
    ans = c_data[d][1]
    if random.random() > 0.5:
        c1, c2 = c2, c1
    
    with open('text_02_{0:04d}.txt'.format(cnt), 'w') as f:
        f.write('{}\n{}\n{}\n{}'.format(d, c1, c2, ans))
