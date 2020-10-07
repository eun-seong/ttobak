import pymysql

conn = pymysql.connect(host='ttobak.cbbaovh5sf1x.ap-northeast-2.rds.amazonaws.com',user='root',password='soma2020',db='ttobak',charset='utf8')

curs = conn.cursor()

sql = """insert into main_img(img_path,img_desc) values (%s,%s)"""

desc = ['a','모음 단어','모음 소리구분','자음 그림소리매칭','자음 음운 포함 여부','자음 단어 발음하기','자음 소리 구분','음운 음절 수 계산','음운 공통소리 찾기','청각처리속도','어음청취력','선택적 집중력']
num = [1,2,3,4,5,6,7,8,9,10,11]

for n in num:
    
    path1 = '/Main/'+str(n)+'.png'
    

    curs.execute(sql,(path1,desc[n]))
    
conn.commit()

conn.close()
