data_text = '''엄마랑 동물원에 갔습니다
기차를 타고 여행을 떠나요
집 안이 너무 조용해요
수박은 너무 달콤해요
동화책을 읽고 싶어요
개미는 오늘도 열심히 일합니다
다람쥐가 밤을 먹고 있어요
바른 자세로 공부합시다
바람이 불어오니 시원하네요
선생님께 인사를 드려요
강아지가 공원에서 신나게 뛰어다녀요
종이에 베여서 피가 많이 나요
바다를 바라보니 마음이 편안해요
생쥐는 사자보다 작고 연약해요
어부가 한가롭게 바다에서 낚시를 해요
낮잠을 잠깐 자도 피곤합니다
어른들께 예의바르게 인사를 드립시다
깊은 산골에 도깨비가 살고 있어요
너무 시끄러워서 고막이 터질 것 같아요
뜨거운 주전자에 손이 데일 수 있어요
도화지에 크레파스로 자동차 그림을 그렸어요
배우는 실감나게 연기를 정말 잘했어요
다람쥐는 날카로운 발톱으로 나무를 잘 타요
내가 상을 받았다는 것이 실감이 나지 않아요
같은 말을 여러 차례 반복해서 학습합시다
토끼는 소나 말처럼 되새김질을 하지 못해요
안개가 자욱이 끼어서 앞이 보이지 않아요
지도에서 동서남북 표시로 위치를 알 수 있어요
김치에는 옛 어른들의 지혜가 담겨 있답니다
과학관에서 다양한 체험을 하는 것이 재밌었어요
공장에서는 신발이나 자동차같이 공업 제품들을 생산합니다
이 곳은 출입이 금지된 구역이니 돌아가 주세요
소설을 읽을 때에는 작가의 배경에 대한 지식이 필요합니다
역사 속에는 옛날 조상들의 삶의 모습이 담겨있어요
다른 사람들의 말을 경청하는 습관을 가집시다
다른 사람의 기분은 아랑곳하지 않고 자리에 앉았어요
친구들과 함께 딱지치기하며 놀았던 그 때가 아직도 생생합니다
골고루 음식을 섭취해야 다양한 영양소를 얻을 수 있어요
소란스러운 분위기 속에 나는 열심히 책을 읽고 있었습니다
그렇게 막연하게만 이야기하지 말고 확실하게 말해줘
성장기의 청소년들은 근육과 골격이 급속도로 발달합니다
우리나라는 높은 수준의 경제성장을 통해 선진국이 되었습니다
건전한 비판은 좋지만 무분별한 비난은 거절합니다
둘도 없는 친구 사이에 싸움이 일어났지만 곧 화해했어요
주장을 할 때에는 항상 근거를 들어야 합니다
소비를 하는 것은 좋지만 무분별한 낭비는 좋지 않아요
아빠가 자동차의 속도를 일정하게 유지하기 시작했어요
최대한 병이 손상되지 않게 조심스럽게 뚜껑을 열었다
태풍으로 인해 수도관이 터져서 물이 나오지 않습니다
바람은 씨앗을 먼 곳으로 옮기는 매체 가운데 하나이다'''

noise_text = '''노래 소리가 참 듣기 좋은 것 같아요. 안 그래요?
민수야. 오늘 나온 게임 해 봤어? 진짜 재밌지 않아?
공공장소에서는 조용히 하도록 합시다. 너무 시끄러워요. 
패스트푸드를 너무 많이 먹는 것은 건강에 좋지 않습니다. 
미술 교과서를 참고해서 그림을 그려 봅시다. 
주희야. 일어나서 큰 소리로 책을 읽어줄 수 있겠니?
저는 축구를 하는 것을 굉장히 좋아합니다. 
엄마, 오늘 저녁은 치킨 먹어요! 치킨!
동에 번쩍! 서에 번쩍! 나는야 홍길동! 
이제 핸드폰 끄고 밥 먹어라. 얼른. '''

data = data_text.split('\n')
noise = noise_text.split('\n')

for i in range(5):
    for j in range(10):
        idx = i * 10 + j
        with open('text_{0:02d}_{1:04d}.txt'.format(i+1, j+1), 'w') as f:
            f.write(data[idx])

for i in range(10):
    with open('noise_{0:04d}.txt'.format(i+1), 'w') as f:
        f.write(noise[i])
