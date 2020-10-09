import json
import bcrypt
import jwt
import random
import requests
import time

from .models  import User,Student,UsrStu,StuIc,Icon,TestMaster,StuTest,CureMaster,StuCure,StuCurrent,TestIdx,CureIdx,ComCure
from . import serializers as sz

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render


class MakeUser(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        
        if User.objects.filter(usr_email=data['email']).exists():
            return JsonResponse({"message":"이미 존재하는 이메일 입니다.","code":2},status=200)

        User.objects.create(
            usr_name=data['name'],
            usr_email=data['email'],
            usr_pw= bcrypt.hashpw(data['pw'].encode("UTF-8"),bcrypt.gensalt()).decode("UTF-8")
        ).save()

        return JsonResponse({"message":"성공적으로 회원가입 되었습니다.","code":1},status=200)



class LogIn(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)

        if User.objects.filter(usr_email=data['email']).exists():
            user = User.objects.get(usr_email=data['email'])

            if bcrypt.checkpw(data['pw'].encode("UTF-8"),user.usr_pw.encode("UTF-8")):
                return JsonResponse({"usr_id":user.usr_id,"code":1},status=200)

            return JsonResponse({"message":"비밀번호가 일치하지 않습니다.","code":2},status=200)

        return JsonResponse({"message":"가입된 메일 주소가 존재하지 않습니다.","code":3},status=200)

class UserModify(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(usr_id=uk)

            if user.usr_email != data['email']:
                if User.objects.filter(usr_email = data['email']).exists():
                    return JsonResponse({"message":"이미 존재하는 이메일입니다.","code":2},status=200)
            
            user.usr_email = data['email']
            user.usr_pw = bcrypt.hashpw(data['pw'].encode("UTF-8"),bcrypt.gensalt()).decode("UTF-8")
            user.usr_name = data['name'] 
            user.save()

            return JsonResponse({"message":"변경사항이 저장되었습니다.","code":1},status=200)

        return JsonResponse({"message":"존재하지 않는 회원입니다","code":3},status=200)

class UserDelete(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(usr_id=uk)
            user.delete()
            ##Should add process to delete student and the all related tables' instance. Will be added after creating all the APIs.
            return JsonResponse({"message":"성공적으로 삭제되었습니다.","code":1},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다.","code":2},status=200)

class UserGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(usr_id=uk)

            return JsonResponse({"name":user.usr_name,"email":user.usr_email,"code":1},status=200)

        return JsonResponse({"message":"존재하지 않는 회원입니다.","code":2},status=200)

class StuAdd(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['u_id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(pk = uk)
            Student.objects.create(
                stu_name = data['name'],
                stu_birth = data['birth'],
                stu_gender = data['gender']
            ).save()

            UsrStu.objects.create(
                usr = user,
                stu = Student.objects.latest('stu_id')
            )
            icon = Icon.objects.get(pk = data['ic_id'])

            StuIc.objects.create(
                stu = Student.objects.latest('stu_id'),
                ic = icon
            )

            return JsonResponse({"message":"성공적으로 추가되었습니다.","code":1},status=200)

        return JsonResponse({"message":"존재하지 않는 회원입니다.","code":2},status=200)

class StuModify(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['u_id']
        sk = data['s_id']

        if User.objects.filter(usr_id = uk).exists():
            if Student.objects.filter(stu_id = sk).exists():
                student = Student.objects.get(pk=sk)
                # icon = Icon.objects.get(pk=ic_id)
                # stu_ic = StuIc.objects.get(stu_id=sk)
                student.stu_name = data['name']
                student.stu_birth = data['birth']
                student.stu_gender = data['gender']

                student.save()

                return JsonResponse({"message":"성공적으로 수정되었습니다.","code":1},status=200)
            return JsonResponse({"message":"존재하지 않는 학습자 입니다.","code":2},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다.","code":3},status=200)


class StuDel(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['u_id']
        sk = data['s_id']
        
        if User.objects.filter(usr_id=uk).exists():
            if Student.objects.filter(stu_id = sk).exists():

                tmp = UsrStu.objects.get(usr = uk, stu = sk)
                tmp.delete()
                ##The deletion of test / study tables' instances related to designated student should be proceed. Will be added.
                student = Student.objects.get(pk=sk)
                student.delete()
                return JsonResponse({"message":"성공적으로 삭제되었습니다.","code":1},status=200)
            return JsonResponse({"message":"존재하지 않는 학습자입니다.","code":2},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다.","code":3},status=200)

class StuGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['u_id']
        sk = data['s_id']

        if User.objects.filter(usr_id = uk).exists():
            if Student.objects.filter(stu_id=sk).exists():

                student = Student.objects.get(pk=sk)

                return JsonResponse({"name":student.stu_name,"birth":student.stu_birth,"gender":student.stu_gender,"code":1},status=200)
            return JsonResponse({"message":"존재하지 않는 학습자 입니다.","code":2},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다.","code":3},status=200)


class SwpGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        url = 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com'

        freq = data['freq']
        level = data['level']
        s_id = data['s_id']
        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if TestMaster.objects.filter(ques_level = level,ques_int=freq,test_idx=1).exists():
                sounds = TestMaster.objects.get(ques_level=level,ques_int=freq,test_idx=1)

                x = random.randint(1,2)
                y = random.randint(1,2)
                answer1 = 'up'
                answer2 = 'up'
                if x ==1:
                    answer1 = 'down'
                if y == 1:
                    answer2= 'down' 
                return JsonResponse({"up_path":url+sounds.ques_path2,"down_path":url+sounds.ques_path1,"answer1":answer1,"answer2":answer2,"swp_id":sounds.ques_id,"code":1},status=200)
            return JsonResponse({"message":"해당 문제가 존재하지 않습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 존재하지 않습니다.","code":3},status=200)

# class SwpGet(View):
#     @csrf_exempt
#     def post(self,request):
#         data = json.loads(request.body)
#         url = 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com'

#         s_id = data['s_id']
#         if Student.objects.filter(pk=s_id).exists():
#             student = Student.objects.get(pk=s_id)
#             if not StuTest.objects.filter(s_id = s_id,test_txt='swp').exists():
#                 level = 1
#                 freq = 500 
#                 sounds = TestMaster.objects.get(ques_level=level,ques_int=freq,test_idx=1)

#                 x = random.randint(1,2)
#                 y = random.randint(1,2)
#                 answer1 = 'up'
#                 answer2 = 'up'
#                 if x ==1:
#                     answer1 = 'down'
#                 if y == 1:
#                     answer2= 'down' 
#                 return JsonResponse({"up_path":url+sounds.ques_path2,"down_path":url+sounds.ques_path1,"answer1":answer1,"answer2":answer2,"swp_id":sounds.ques_id,"code":1},status=200)
#             return JsonResponse({"message":"해당 문제가 존재하지 않습니다.","code":2},status=200)
#         return JsonResponse({"message":"해당 학습자가 존재하지 않습니다.","code":3},status=200)

class SwpAns(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)

        s_id = data['s_id']
        swp_id = data['swp_id']
        ori1 = data['ori_answer1']
        ori2 = data['ori_answer2']
        stu1 = data['stu_answer1']
        stu2 = data['stu_answer2']
        
        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk = s_id)
            if TestMaster.objects.filter(pk=swp_id).exists():
                swp = TestMaster.objects.get(pk=swp_id)

                iscorrect = 'N'
                mes = "답이 틀렸습니다."
                if ori1 == stu1 and ori2 == stu2 :
                    iscorrect = 'Y'
                    mes = "답이 맞았습니다."
                StuTest.objects.create(
                    stu = student,
                    ques = swp,
                    is_correct = iscorrect,
                    test_txt = 'swp'
                )
                return JsonResponse({"message":mes,"code":1},status=200)
            return JsonResponse({"message":"해당 문제가 없습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 없습니다.","code":3},status=200)

class PhGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        url = 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com'

        lev = data['level']
        s_id = data['s_id']

        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if TestMaster.objects.filter(ques_level=lev,test_idx=2).exists():
               Phset = TestMaster.objects.filter(ques_level = lev,test_idx=2)
               cnt = Phset.count()
               n1 = random.randrange(cnt)
               n2 = random.randrange(cnt)
               
               while n1 == n2 :
                   n2 = random.randrange(cnt)
               
               answer = n1
               if random.randint(1,2) == 1:
                   answer = n2
               
               ph1 = Phset[n1]
               ph2 = Phset[n2]



               return JsonResponse({"ph1":ph1.ques_char,"ph1_path":url+ph1.ques_path1,"ph2":ph2.ques_char,"ph2_path":url+ph2.ques_path1,"answer":Phset[answer].ques_char,"code":1},status=200)
            return JsonResponse({"message":"해당 레벨의 문제가 존재하지 않습니다.","code":2},status=200) 
        return JsonResponse({"message":"해당 학습자가 존재하지 않습니다.","code":3},status=200)


class PhAns(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        
        s_id = data['s_id']
        ph1 = data['ph1']
        ph2 = data['ph2']
        stu_answer = data['stu_answer']
        ori_answer = data['ori_answer']

        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if TestMaster.objects.filter(ques_char = ph1,test_idx=2).exists():
                p1 = TestMaster.objects.get(ques_char=ph1,test_idx=2)
                if TestMaster.objects.filter(ques_char=ph2,test_idx=2).exists():
                    p2 = TestMaster.objects.get(ques_char=ph2,test_idx=2)

                    message = "답이 틀렸습니다."
                    is_correct = "N"
                    if stu_answer == ori_answer :
                        message = "답이 맞았습니다."
                        is_correct = "Y"

                    StuTest.objects.create(
                        stu = student,
                        ques = p1,
                        ques2 = p2,
                        is_correct = is_correct,
                        test_txt = 'ph'
                    )

                    return JsonResponse({"message":message,"code":1},status=200)
                return JsonResponse({"message":"ph2가 존재하지 않습니다.","code":2},status=200)
            return JsonResponse({"message":"ph1이 존재하지 않습니다.","code":3},status=200)
        return JsonResponse({"message":"해당 학습자가 존재하지 않습니다.","code":4},status=200)



class FocGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        url = 'https://ttobakaudio.s3-ap-northeast-2.amazonaws.com'

        s_id = data['s_id']
        level = data['level']

        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if TestMaster.objects.filter(ques_level = level,test_idx=3).exists():
                focs = TestMaster.objects.filter(ques_level = level,test_idx=3)
                foc = sz.FocSerializer(focs,many=True)
                new_list = []
                r_num = random.randint(1,10)
                for i in range(10):
                    while r_num in new_list:
                        r_num = random.randint(1,10)
                    new_list.append(r_num)
                     
                return JsonResponse({"focs" : foc.data,"script_order": new_list,"code":1},status=200)
                
                # return JsonResponse({"focs" : foc.data,"code":1},status=200)
            return JsonResponse({"message":"해당 레벨에 해당하는 문제가 없습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 없습니다.","code":3},status=200)

class FocAns(View):
    @csrf_exempt
    def post(self,request):
        s_id = request.POST['s_id']
        ques_id = request.POST['ques_id']
        

        if not request.FILES:
            return JsonResponse({"message":"파일이 올바르지 않습니다.","code":4},status=200)
        files = request.FILES['file']
        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if TestMaster.objects.filter(pk=ques_id).exists():
                foc = TestMaster.objects.get(pk=ques_id)
                transcript = foc.ques_char
                gender = student.stu_gender
                url = 'http://54.180.102.87/api/segscore'
                # fname = make_filename(files.name)
                # f = open('temp_files/'+filename,'wb')
                # f.write(f.read())
                # f.close
                data = {"gender":gender,"transcript":transcript,"file":files}
                response = requests.request("POST",url,data=data)
                res = response.json()
                # print(files.open())
                 
                return JsonResponse({"score" : res ,"code":1},status=200) 
            return JsonResponse({"message":"해당 레벨에 해당하는 문제가 없습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 없습니다.","code":3},status=200)


class CureGet(View):

    def get_read(self,read_idx,p_id,read_level):
        if CureMaster.objects.filter(pk = p_id).exists():
            t_id = CureMaster.objects.get(pk=p_id).cure_tid
            reads = CureMaster.objects.filter(cure_tid=t_id,cure_idx=read_idx,cure_level=read_level)
            read_data = sz.ReadSerializer(data = reads,many=True)
            read_data.is_valid()
            read_data = read_data.data
            return read_data
        else:
            return "더 이상 치료가 존재하지 않습니다."
    
    def get_review():
        return 1

    def serialized(self,data,curr_idx):
        cure_serializer = {
            3 : sz.CountSerializer(data=data,many=True),
            5 : sz.CountSerializer(data=data,many=True),
            6 : sz.VowelsoundSerializer(data=data,many=True),
            7 : sz.ConsomatchSerializer(data=data,many=True),
            8 : sz.ConsocommonSerializer(data=data,many=True),
            9 : sz.CountSerializer(data=data,many=True),
            10 : sz.ConsosoundSerializer(data=data,many=True),
        }
        return cure_serializer[curr_idx]
    
    def make_answer(self,curr_idx,cnt,curr_level):
        answer = []
        ans_list = []
        if curr_idx == 7 :
            for i in range(10):
                tmp = []
                k = random.randrange(cnt)
                for i in range(3):
                    while k in tmp:
                        k = random.randrange(cnt)
                    tmp.append(k)
                    if k not in ans_list:
                        ans_list.append(k)
                ans = random.sample(tmp,1)
                tmp.append(ans)
                answer.append(tmp)
            
            cure = []
            cures = CureMaster.objects.filter(cure_idx = curr_idx,cure_level = curr_level)
            for a in ans_list:
                a = int(a)
                cure.append(cures[a])
            return cure,answer
                
    def get_cure(self,curr_idx,curr_level):
        answer = [] 
        if curr_idx == 4:
            if ComCure.objects.filter(com_level=curr_level).exists():
                Cures = list(ComCure.objects.filter(com_level=curr_level))
                rand_cures = random.sample(Cures,10)
                cures = sz.CommonSerializer(data=rand_cures,many=True)
                cures.is_valid()
                return cures.data,answer
            else:
                return "해당하는 문제가 존재하지 않습니다."
        if CureMaster.objects.filter(cure_idx = curr_idx,cure_level = curr_level).exists():
           Cures = list(CureMaster.objects.filter(cure_idx=curr_idx,cure_level = curr_level))
           rand_cures = Cures
           if len(Cures) > 10:
               rand_cures = random.sample(Cures,10)
           if curr_idx == 7 :
               cnt = len(Cures)
               rand_cures , answer = self.make_answer(curr_idx,cnt,curr_level)
           cures = self.serialized(rand_cures,curr_idx)
           cures.is_valid()
           return cures.data,answer
    
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        s_id = data['s_id']
        if 'idx_txt' in data:
            idx_txt = data['idx_txt']
            return JsonResponse({"sss":idx_txt},status=200)
        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if not StuCurrent.objects.filter(stu_id = s_id).exists():
                StuCurrent.objects.create(
                    stu = student,
                    cur_read = 'poem',
                    read_level = 1,
                    curr_level = 1,
                    cur_read_id = 1259,
                    cur_curr = 'count'
                ).save()
            stucur = StuCurrent.objects.get(stu_id=s_id)
            read_idx = CureIdx.objects.get(idx_txt=stucur.cur_read).idx_id
            read_id = stucur.cur_read_id
            read_level = stucur.read_level
            read = self.get_read(read_idx,read_id,read_level)
            curr_idx = CureIdx.objects.get(idx_txt=stucur.cur_curr).idx_id
            curr_level = stucur.curr_level
            cure , answer = self.get_cure(curr_idx,curr_level)
            return JsonResponse({"read":read,"cure":cure,"daily_cure": stucur.cur_curr,"answers": answer , "code":1},status=200)
        return JsonResponse({"message": "존재하지 않는 학습자입니다.","code":2},status=200)

class CureAns(View):
    def update_read(self,s_id,new_read_id,read_idx):
        if CureMaster.objects.filter(pk=new_read_id).exists():
            next_read = CureMaster.objects.get(pk=new_read_id)
            new_read_idx = read_idx
            if new_read_idx != next_read.cure_idx.idx_id:
                read_order = CureIdx.objects.get(pk=next_read.cure_idx.idx_id)
                read_order = read_order.read_order
                read_order += 1 
                if CureIdx.objects.filter(read_order = read_order).exists():
                    new_read_idx = CureIdx.objects.get(read_order=read_order).idx_id
                else:
                    return False
            cure_info = CureIdx.objects.get(pk=new_read_idx)
            stucur = StuCurrent.objects.get(stu_id=s_id)
            stucur.cur_read = cure_info.idx_txt
            stucur.cur_read_id = next_read.cure_id
            stucur.read_level = next_read.cure_level
            stucur.save()
            return True
        else:
            return False
    
    def ans_read(self,student,data,idx_id):
        score = data['score']
        phone_score = data['phone_score']
        speed_score = data['speed_score']
        rhythm_score = data['rhythm_score']
        cure_id = data['cure_id']
        cure_txt = CureIdx.objects.get(pk=idx_id).idx_txt
        class_txt = 'A'
        is_pass = False
        is_review = data['is_review'] 
        if score >= 85:
            is_pass = True
        elif score >= 75 :
            class_txt = 'B'
        elif score >= 65:
            clsss_txt = 'C'
        elif score >= 55:
            class_txt = 'D'
        StuCure.objects.create(
            stu = student,
            full_score = score,
            cure_id = cure_id,
            phone_score = phone_score,
            speed_score = speed_score,
            rhythm_score = rhythm_score,
            is_review = is_review,
            cure_txt = cure_txt
        ).save()
        return cure_id+1, class_txt, is_pass

    def answer_alternative(self,student,data,idx_id):
        ori_answer = data['ori_answer']
        stu_answer = data['stu_answer']
        cure_id = data['cure_id']
        cure = CureMaster.objects.get(pk=cure_id)
        cure_txt = CureIdx.objects.get(pk=idx_id).idx_txt
        is_review = data['is_review']
        is_correct = 'F'
        if ori_answer == stu_answer:
            is_correct = 'T'
        StuCure.objects.create(
            stu = student,
            is_correct = is_correct,
            cure_id = cure_id,
            is_review = is_review,
            ori_answer = ori_answer,
            stu_answer = stu_answer,
            cure_txt = cure_txt
        ).save()
        to_next_level = False
        to_next_study = False
        stucur = StuCurrent.objects.get(stu_id = student.stu_id)
        if stucur.cur_curr_last1 and stucur.cur_curr_last2 and stucur.cur_curr_last3:
            if stucur.cur_curr_last1 >= 90 and stucur.cur_curr_last2 >= 90 and stucur.cur_curr_last3 >= 90:
                if CureMaster.objects.filter(idx_id = idx_id, cure_level = cure.cure_level+1).exists():
                    to_next_level = True
                else:
                    to_next_study = True
        return to_next_level, to_next_study , is_correct

    def update_alternative(self,to_next_level,to_next_study,data,student,idx_txt,idx_id):
        s_id = student.stu_id
        stucur = StuCurrent.objects.get(stu_id = s_id)
        if to_next_level:
            stucur.curr_level += 1
            stucur.cur_curr_last1 = 0
            stucur.cur_curr_last2 = 0
            stucur.cur_curr_last3 = 0
        if to_next_study:
            current = CureIdx.objects.get(idx_id).curr_order
            next_cur = current + 1
            if CureIdx.objects.filter(curr_order = next_cur).exists():
                stucur.curr_curr = next_cur
                stucur.cur_level = 1
                stucur.cur_curr_last1 = 0
                stucur.cur_curr_last2 = 0
                stucur.cur_curr_last3 = 0
            else : 
                return False
        if not to_next_level and not to_next_study:
            temp1 = 0
            temp2 = 0
            cures = StuCure.objects.filter(stu = student,cure_txt = idx_txt,is_review = 'F')
            length = cures.count()
            if length % 10 == 0:
                cures = list(cures)[-10:]
                if stucur.cur_curr_last1:
                    temp1 = stucur.cur_curr_last1
                if stucur.cur_curr_last2:
                    temp2 = stucur.cur_curr_last2
                tmp = 0
                for c in cures:
                    if c.is_correct == 'T':
                        tmp += 1
                stucur.cur_curr_last1 = tmp * 10
                stucur.cur_curr_last2 = temp1
                stucur.cur_curr_last3 = temp2
        
        stucur.save()
        return True


        

    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        s_id = data['s_id']
        idx_txt = data['idx_txt']
        if CureIdx.objects.filter(idx_txt = idx_txt).exists():
            i = CureIdx.objects.get(idx_txt = idx_txt)
            idx_id = i.idx_id
            if Student.objects.filter(pk=s_id).exists():
                student = Student.objects.get(pk=s_id)
                if idx_id == 1 or idx_id == 2 or idx_id == 11 or idx_id == 12: # read
                    new_read_id , class_txt , is_pass = self.ans_read(student,data,idx_id)
                    if is_pass :
                        s = self.update_read(s_id,new_read_id,idx_id)
                        if s:
                            return JsonResponse({"is_okay":is_pass,"class": class_txt,"code":1},status=200)
                        else:
                            return JsonResponse({"is_okay":is_pass,"class": class_txt,"message": "더 이상 학습할 문제가 없습니다.","code":2},status=200)
                elif idx_id == 3:
                    to_next_level, to_next_study, is_correct = self.answer_alternative(student,data,idx_id)
                    s = self.update_alternative(to_next_level,to_next_study,data,student,idx_txt,idx_id)
                    if s:
                        return JsonResponse({"is_correct":is_correct,"code":1},status=200)
                    else:
                        return JsonResponse({"is_correct":is_correct,"code":1,"message":"모든 문제를 학습하였습니다."})
        else:
            return JsonResponse({"message": "해당 학습이 존재하지 않습니다.","code":"err"},status=200)


        