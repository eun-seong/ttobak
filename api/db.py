import pymysql

conn = pymysql.connect(host='ttobak.cbbaovh5sf1x.ap-northeast-2.rds.amazonaws.com',user='root',password='soma2020',db='ttobak',charset='utf8')

curs = conn.cursor()

sql = """insert into test_master(ques_level,ques_path1,idx_id) values (%s,%s,%s)"""

level = [0,1,2,3,4,5,6]
sound = [0,1,2,3]

for s in sound:
    for l in level:
        path1 = '/diagnose/concentration/sound_'
        path1 = path1 +str(s)+'_'+str(l)+'.wav'

        curs.execute(sql,(str(l),path1,3))
    
conn.commit()

conn.close()
