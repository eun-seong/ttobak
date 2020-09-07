import random

data = [
    ['아', '어', '오', '우', '으', '이', '애', '에'],
    ['여', '요', '유', '얘', '예'],
    ['왜', '워', '웨', '외', '위', '의']
]

word_text = '''거기 고기
다리 도리
사진 수진
조기 주기
투구 투기
의자 이자
가루 그루
마루 머루
개미 거미
소리 사리
커피 코피
수박 소박
예의 우의
무리 머리
이해 오해
소설 사설
체리 추리
아기 우기
사건 수건
야수 여수
대구 도구
서양 사양
배추 부추
버스 부스
파도 포도
마음 무음
저장 주장
진심 조심
구리 거리
재미 조미
요리 우리
사장 새장
유리 의리
도장 대장
우산 유산
처가 추가
효자 후자
후보 화보
채소 초소
주인 죄인
긍정 강정
봄비 밤비
발레 벌레
장기 쟁기
방송 봉송
상품 성품
증상 정상
긴장 간장
만세 면세
성인 상인
생선 상선
정비 장비
순수 산수
속도 식도
분수 변수
연기 온기
행사 황사
연고 인고
손수 선수
문제 면제'''

word_data = word_text.split('\n')

for i in range(3):
    cnt = 0
    for j in range(len(data[i])):
        for k in range(j+1, len(data[i])):
            c1 = data[i][j]
            c2 = data[i][k]
            ans = c1
            cnt+=1
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
    c1 = data_sum[question[i][0]]
    c2 = data_sum[question[i][1]]
    ans = c1
    if random.random() > 0.5:
        c1, c2 = c2, c1
    with open('text_{0:02d}_{1:04d}.txt'.format(4, i+1), 'w') as f:
        f.write('{}\n{}\n{}\n'.format(ans, c1, c2))

for i, d in enumerate(word_data):
    text = d.split(' ')
    c1 = text[0]
    c2 = text[1]
    if random.random() > 0.5:
        ans = c1
    else:
        ans = c2
    with open('text_05_{0:04d}.txt'.format(i+1), 'w') as f:
        f.write('{}\n{}\n{}\n'.format(ans, c1, c2))
