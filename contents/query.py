import pymysql

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

