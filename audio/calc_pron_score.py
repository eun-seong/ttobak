import sys
import math
import json

def levenshtein_distance_each(x, y):
    if x == y:
        return 0.0
    elif int(x) == int(y):
        return (x - y) ** 2
    else:
        return 1.0

def levenshtein_distance(phone1, phone2):
    table = {
        'g': (1.0, 4.0), 'gg': (1.3, 4.0), 'kh': (1.6, 4.0), 'g2': (1.0, 4.0),
        'n': (4.0, 2.0), 'n2': (4.0, 2.0),
        'd': (1.0, 2.0), 'dd': (1.3, 2.0), 't': (1.6, 2.0), 'd2': (1.0, 2.0),
        'l': (5.0, 2.0), 'l2': (5.0, 2.0),
        'm': (4.0, 1.0), 'm2': (4.0, 1.0),
        'b': (1.0, 1.0), 'bb': (1.3, 1.0), 'p': (1.9, 1.0), 'b2': (1.0, 1.0),
        's': (3.0, 2.0), 'ss': (3.3, 2.0),
        'ng': (4.0, 4.0),
        'j': (2.0, 3.0), 'jj': (2.3, 3.0), 'ch': (2.6, 3.0),
        'h': (3.0, 5.0),
        'i': (10.0, 10.0), 'wi': (10.0, 10.2), 'eu': (10.0, 10.5), 'u': (10.0, 10.9),
        'e': (10.3, 10.15), 'oe': (10.3, 10.37), 'o': (10.3, 10.8),
        'ae': (10.6, 10.3), 'eo': (10.6, 10.65),
        'a': (10.9, 10.5),
        'ya': (10.45, 10.25), 'yae': (10.3, 10.15), 'yeo': (10.3, 10.375), 'ye': (10.15, 10.075),
        'wae': (10.45, 10.65), 'yo': (10.15, 10.4), 'wo': (10.3, 10.775), 'we': (10.15, 10.525),
        'yu': (10.0, 10.45), 'ui': (10.0, 10.25), 'wa': (10.45, 10.65)
    }
    if phone1 not in table or phone2 not in table:
        return 0.0
    v1 = table[phone1]
    v2 = table[phone2]

    x = levenshtein_distance_each(v1[0], v2[0])
    y = levenshtein_distance_each(v1[1], v2[1])

    return math.sqrt((x+y) / 2.0)

def get_distance(text1, text2):
    text1_len = len(text1)
    text2_len = len(text2)

    cache = [[0] * (text2_len+1) for _ in range(text1_len+1)]
    for i in range(0, text1_len+1):
        cache[i][0] = i
    for j in range(0, text2_len+1):
        cache[0][j] = j

    for i in range(1, text1_len+1):
        for j in range(1, text2_len+1):
            cache[i][j] = min(cache[i][j-1]+1.0, cache[i-1][j]+1.0, cache[i-1][j-1]+levenshtein_distance(text1[i-1], text2[j-1])) 
    return cache[text1_len][text2_len]

def get_time(element):
    key = list(element.keys())[0]
    temp1 = key.split(':')
    temp2 = temp1[1].split('.')
 
    minutes = int(temp1[0])
    seconds = int(temp2[0])
    milis = int(temp2[1])
   
    return minutes * 60000 + seconds * 1000 + milis

def get_time_score(element1, element2):
    time1 = get_time(element1)
    time2 = get_time(element2)

    if time2 - time1 < 60:
        return 1.0
    elif time2 - time1 > 1500:
        return -1.0
    else:
        return 0.0 

def calc_score(res, ans, trans, final):
    trans_file = open(trans, 'r')
    res_file = open(res, 'r')
    ans_file = open(ans, 'r')
    
    temp0 = trans_file.readlines()
    data = json.load(res_file)
    temp1 = ans_file.readlines()
    
    trans_file.close()
    res_file.close()
    ans_file.close()
    
    phone_score = -1.0
    speed_score = 0.0

    if len(temp0) == 0:
        trans_text = ''
        phone_score = 0.0
        speed_score = 0.0
    else:
        trans_text = temp0[0].strip()

    if len(temp1) == 0:
        ans = []
        phone_score = 0.0
        speed_score = 0.0
    else:
        ans = temp1[0].strip().split(' ')
    
    res = [list(el.values())[0] for el in data]
    if len(res) == 0:
        phone_score = 0.0
        speed_score = 0.0

    if phone_score == -1.0:
        avg_speed = get_time(data[-1]) / len(res)
        
        # add underbar to student's pronounce
        ins_cand = []
        for idx in range(len(data)-1):
            if get_time(data[idx+1]) - get_time(data[idx]) > avg_speed * 1.7:
                ins_cand.append(idx+len(ins_cand)+1)
        for el in ins_cand:
            res.insert(el, '_')

        res_no_underbar = [el for el in res if el != '_']
        ans_no_underbar = [el for el in ans if el != '_']

        distance = get_distance(res_no_underbar, ans_no_underbar)
        total = max(len(res_no_underbar), len(ans_no_underbar))

        phone_score = 100.0 - (distance / total * 100.0)
        
        for idx in range(len(data)-1):
            speed_score += get_time_score(data[idx], data[idx+1])
        if speed_score > 10.0: speed_score = 10.0
        if speed_score < -10.0: speed_score = -10.0

        underbar_count = abs(ans.count('_') - res.count('_'))
        rhythm_count_score = 5.0 if underbar_count == 0 else -min(underbar_count*0.5, 5.0)

        idx_underbar_res = [idx for idx, el in enumerate(res) if el == '_']
        idx_underbar_ans = [idx for idx, el in enumerate(ans) if el == '_']
        
        rhythm_dis = 0.0
        for res_idx, res_el in enumerate(res):
            min_val = 987654321
            for ans_idx, ans_el in enumerate(ans):
                min_val = min(min_val, abs(ans_idx - res_idx))
                if ans_idx >= res_idx: break
            rhythm_dis += min_val
        rhythm_dis_score = 5.0 - min(rhythm_dis * 5 / max(len(res), len(ans)), 10.0)

        rhythm_score = rhythm_count_score + rhythm_dis_score

    score = min(100.0, phone_score + speed_score + rhythm_score)
    ans_text = ' '.join(ans)
    res_text = ' '.join(res)

    print('Transcript : ', trans_text)
    print('Correct : ', ans_text)
    print('Student : ', res_text)
    print('Score : ', score)
    print('Phone Score : ', phone_score)
    print('Speed Score : ', speed_score)
    print('Rhythm Score : ', rhythm_score)
    
    result = {'score': score, 'phone_score': phone_score, 'speed_score': speed_score, 'rhythm_score': rhythm_score, 'transcript': trans_text, 'correct': ans_text, 'student': res_text}

    final_file = open(final, 'w')
    json.dump(result, final_file)
    final_file.close()

if __name__ == '__main__':
    print(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    calc_score(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    # res = '/home/marble/PycharmProjects/ali/1595071594619/result.txt'
    # ans = '/home/marble/PycharmProjects/data/00008024/00008024.prons.txt'
    # final = '/home/marble/PycharmProjects/result/00008024_104_1595070537522.txt'
    # calc_score(res, ans, final)
