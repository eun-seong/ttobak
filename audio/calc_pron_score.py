import sys
import math

def get_diff_each(x, y):
    if x == y:
        return 1.0
    elif int(x) == int(y):
        return (x - y) ** 2
    else:
        return 0.0

def get_diff(phone1, phone2):
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

    v1 = table[phone1]
    v2 = table[phone2]

    x = get_diff_each(v1[0], v2[0])
    y = get_diff_each(v1[1], v2[1])

    return 0.0
    # return math.sqrt((x+y) / 2.0)

def lcs_length(text1, text2):
    text1_len = len(text1) - 1
    text2_len = len(text2) - 1

    cache = [[0] * (text2_len + 1) for _ in range(text1_len + 1)]
    for i in range(1, text1_len + 1):
        for j in range(1, text2_len + 1):
            if text1[i] == text2[j]:
                cache[i][j] = cache[i-1][j-1] + 1.0
            else:
                cache[i][j] = max(cache[i][j-1], cache[i-1][j]) + get_diff(text1[i], text2[j])

    return cache[text1_len][text2_len]

def calc_score(res, ans, final):
    res_file = open(res, 'r')
    ans_file = open(ans, 'r')

    text1 = res_file.readlines()[0].strip().split(' ')
    text2 = ans_file.readlines()[0].strip().split(' ')

    lcs = lcs_length(text1, text2)
    total = max(len(text2), len(text1))

    score = lcs / total * 100.0
    print(score)

    res_file.close()
    ans_file.close()

    final_file = open(final, 'w')
    final_file.write(str(score))
    final_file.close()

if __name__ == '__main__':
    print(sys.argv[1], sys.argv[2], sys.argv[3])
    calc_score(sys.argv[1], sys.argv[2], sys.argv[3])
    # res = '/home/marble/PycharmProjects/ali/1595071594619/result.txt'
    # ans = '/home/marble/PycharmProjects/data/00008024/00008024.prons.txt'
    # final = '/home/marble/PycharmProjects/result/00008024_104_1595070537522.txt'
    # calc_score(res, ans, final)