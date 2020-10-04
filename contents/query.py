import pymysql
import glob

conn = pymysql.connect(host='ttobak.cbbaovh5sf1x.ap-northeast-2.rds.amazonaws.com',user='root',password='soma2020',db='ttobak',charset='utf8')
curs = conn.cursor()

def insert_diagnose_01_sweeps():
    default_path = '/diagnose/01_sweeps/'
    levels = {1: 80, 2: 60, 3: 40, 4: 35, 5: 30}
    freqs = [2000, 1000, 500]

    for level in levels:
        for freq in freqs:
            path1 = default_path + 'd_{}_{}.wav'.format(freq, levels[level])
            path2 = default_path + 'u_{}_{}.wav'.format(freq, levels[level])

            sql = '''INSERT INTO test_master(ques_level, ques_path1, ques_path2, ques_int, idx_id) 
                        VALUES (%s, %s, %s, %s, 1)'''

            curs.execute(sql, (level, path1, path2, freq))

    conn.commit()

def insert_diagnose_02_recognition():
    default_path = '/diagnose/02_recognition/'

    for dataset in range(1, 5):
        for script in range(1, 51):
            path = default_path + 'text_{0:02d}_{1:04d}_0001.wav'.format(dataset, script)

            text_path = '.' + default_path + 'text_{0:02d}_{1:04d}.txt'.format(dataset, script)
            with open(text_path) as f:
                line = f.readline().strip()

            sql = '''INSERT INTO test_master(ques_level, ques_path1, ques_int, ques_char, idx_id)
                        VALUES (1, %s, %s, %s, 2)'''

            curs.execute(sql, (path, dataset, line))

    conn.commit()

def insert_dignose_03_attention():
    default_path = '/diagnose/03_attention/'

    for word_level in range(1, 6):
        for noise_level in range(1, 6):
            for script in range(1, 11):
                path = default_path + 'atten_{0:02d}_{1:02d}_{2:04d}.wav'.format(word_level, noise_level, script)
                level = (word_level-1) * 5 + noise_level

                text_path = '.' + default_path + 'text_{0:02d}_{1:04d}.txt'.format(word_level, script)
                with open(text_path) as f:
                    line = f.readline().strip()

                sql = '''INSERT INTO test_master(ques_level, ques_path1, ques_int, ques_char, idx_id)
                            VALUES (%s, %s, %s, %s, 3)'''


                curs.execute(sql, (level, path, script, line))

    conn.commit()

def insert_treatment_01_poem():
    default_path = '/treatment/01_poem/'

    for level in range(1, 4):
        for script in range(1, 21):
            text_path = '.' + default_path + 'poem_{0:02d}_{1:04d}.txt'.format(level, script)
            with open(text_path) as f:
                lines = f.readlines()[2:]
                lines = [el.strip() for el in lines if el.strip() != '']

                for line in range(len(lines)):
                    path = default_path + 'poem_{0:02d}_{1:04d}_{2:04d}.wav'.format(level, script, line+1)

                    sql = '''INSERT INTO cure_master(cure_level, cure_path, cure_tid, cure_text, idx_id)
                                VALUES (%s, %s, %s, %s, 1)'''

                    curs.execute(sql, (level, path, script, lines[line]))

    conn.commit()

def insert_treatment_03_count():
    default_path = '/treatment/03_count/'

    for script in range(1, 61):
        path = default_path + 'text_{0:04d}_0001.wav'.format(script)
        text_path = '.' + default_path + 'text_{0:04d}.txt'.format(script)

        with open(text_path) as f:
            line = f.readline().strip()

        sql = '''INSERT INTO cure_master(cure_level, cure_path, cure_word, idx_id) 
                    VALUES (1, %s, %s, 3)'''

        curs.execute(sql, (path, line))

    conn.commit()

def insert_treatment_04_common():
    default_path = '/treatment/04_common/'

    for level in range(1, 4):
        for script in range(1, 21):
            text_path = '.' + default_path + 'text_{0:02d}_{1:04d}.txt'.format(level, script)

            with open(text_path) as f:
                lines = f.readlines()
                lines = [el.strip() for el in lines]

                word1, word2, word3 = lines[:3]
                ex1, ex2, ex3, ex4 = lines[3:7]
                ans = lines[7]

                paths = [default_path + 'text_{0:02d}_{1:04d}_{2:04d}.wav'.format(level, script, idx) for idx in range(1, 9)]

                sql = '''INSERT INTO com_cure(com_level, com_w1, com_w2, com_w3, com_e1, com_e2, com_e3, com_e4, 
                            com_ans, com_w1path, com_w2path, com_w3path, com_e1path, com_e2path, com_e3path, com_e4path) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''

                curs.execute(sql, (level, word1, word2, word3, ex1, ex2, ex3, ex4, ans,
                                   paths[0], paths[1], paths[2], paths[3], paths[4], paths[5], paths[6]))
    conn.commit()

def insert_treatment_05_vowelword():
    default_path = '/treatment/05_vowelword/'

    for level in range(1, 4):
        text_files = glob.glob('.' + default_path + 'text_{0:02d}_*'.format(level))
        text_files.sort()

        for script in range(1, len(text_files)+1):
            path = default_path + 'text_{0:02d}_{1:04d}_0001.wav'.format(level, script)
            text_path = text_files[script-1]

            with open(text_path) as f:
                line = f.readline().strip()

                sql = '''INSERT INTO cure_master(cure_level, cure_path, cure_word, idx_id) 
                            VALUES (%s, %s, %s, 5)'''
                curs.execute(sql, (level, path, line))
    conn.commit()

def insert_treatment_06_vowelsound():
    default_path = '/treatment/06_vowelsound/'

    for level in range(1, 6):
        text_files = glob.glob('.' + default_path + 'text_{0:02d}_*'.format(level))
        text_files.sort()

        for script in range(1, len(text_files)+1):
            text_path = text_files[script - 1]

            with open(text_path) as f:
                lines = f.readlines()
                lines = [el.strip() for el in lines]

                ans, ex1, ex2 = lines
                path1 = default_path + 'text_{0:02d}_{1:04d}_0002.wav'.format(level, script)
                path2 = default_path + 'text_{0:02d}_{1:04d}_0003.wav'.format(level, script)

                if ans == ex2:
                    ex1, ex2 = ex2, ex1
                    path1, path2 = path2, path1

                sql = '''INSERT INTO cure_master(cure_level, cure_path, cure_path2, cure_word, cure_word2, idx_id) 
                            VALUES (%s, %s, %s, %s, %s, 6)'''
                curs.execute(sql, (level, path1, path2, ex1, ex2))
    conn.commit()

def insert_treatment_07_consomatch():
    default_path = '/treatment/07_consomatch/'

    for script in range(1, 89):
        text_path = '.' + default_path + 'text_{0:04d}.txt'.format(script)
        with open(text_path) as f:
            line = f.readline().strip()

            path1 = default_path + 'text_{0:04d}_0001.wav'.format(script)
            path2 = '/words/{}.{}.png'.format(script, line)

            sql = '''INSERT INTO cure_master(cure_level, cure_path, cure_path2, cure_word, idx_id) 
                               VALUES (1, %s, %s, %s, 7)'''

            curs.execute(sql, (path1, path2, line))

    conn.commit()

def insert_treatment_08_consocommon():
    default_path = '/treatment/08_consocommon/'
    data_text = '''가방 가위 개구리 개미 고래 나무 나비 남자 너구리 날개 대나무 도끼 동전 
                    두더지 둥지 라면 리코더 만두 망원경 모기 모자 미끄럼틀 바다 바지 반지 
                    배꼽 버스 사과 사탕 서점 손목 쇠똥구리 열쇠 오렌지 오리 우산 운동장 자두 
                    잠자리 조개 주전자 지우개 책 청소기 축구 치약 칫솔 카메라 캥거루 코끼리 
                    키위 커피 타조 태양 탬버린 토끼 토마토 파리 편지 포도 피아노 피터팬 허리 
                    호랑이 하마 연못 햄버거 꽃 꿈 꿩 꿀 땅콩 똥 떡 떡볶이 딸기 빨래 뻐꾸기 
                    뽀뽀 뿌리 쓰레기 씨앗 씨름 쌀 짬뽕 짝수 쪽지 찌개'''
    data = data_text.split(' ')

    for level in range(1, 4):
        text_files = glob.glob('.' + default_path + 'text_{0:02d}_*'.format(level))
        text_files.sort()

        for script in range(1, len(text_files)):
            text_path = '.' + default_path + 'text_{0:02d}_{1:04d}.txt'.format(level, script)

            with open(text_path) as f:
                lines = f.readlines()
                lines = [el.strip() for el in lines]

                word, ex1, ex2, ans = lines

                if word == ex2:
                    ex1, ex2 = ex2, ex1

                idx = data.index(word)
                path = '/words/{}.{}.png'.format(idx, word)

                sql = '''INSERT INTO cure_master(cure_level, cure_path, cure_word, cure_word2, cure_text, idx_id) 
                               VALUES (%s, %s, %s, %s, %s, 8)'''

                curs.execute(sql, (level, path, ex1, ex2, word))
    conn.commit()

insert_treatment_08_consocommon()