import random

data = [
    ['아', '어', '오', '우', '으', '이', '애', '에'],
    ['여', '요', '유', '얘', '예'],
    ['왜', '워', '웨', '외', '위', '의']
]

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
