import json
import bcrypt
import jwt
import random

from .models  import User,Student,UsrStu,SwpTest,StuSwp,PhTest,StuPh,FocTest,StuFoc,StuFocArr,FocScript,StuFoc

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

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
            if SwpTest.objects.filter(swp_level = level,swp_freq=freq).exists():
                sounds = SwpTest.objects.get(swp_level=level,swp_freq=freq)

                x = random.randint(1,2)
                y = random.randint(1,2)
                answer1 = 'up'
                answer2 = 'up'
                if x ==1:
                    answer1 = 'down'
                if y == 1:
                    answer2= 'down' 
                return JsonResponse({"up_path":url+sounds.swp_uppath,"down_path":url+sounds.swp_downpath,"answer1":answer1,"answer2":answer2,"swp_id":sounds.swp_id,"code":1},status=200)
            return JsonResponse({"message":"해당 문제가 존재하지 않습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 존재하지 않습니다.","code":3},status=200)

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
            if SwpTest.objects.filter(pk=swp_id).exists():
                swp = SwpTest.objects.get(pk=swp_id)

                iscorrect = 'false'
                mes = "답이 틀렸습니다."
                if ori1 == stu1 and ori2 == stu2 :
                    iscorrect = 'true'
                    mes = "답이 맞았습니다."
                StuSwp.objects.create(
                    stu = student,
                    swp = swp,
                    is_correct = iscorrect
                )
                return JsonResponse({"message":mes,"code":1},status=200)
            return JsonResponse({"message":"해당 문제가 없습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 없습니다.","code":3},status=200)

class PhGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)

        lev = data['level']
        s_id = data['s_id']

        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if PhTest.objects.filter(ph_level=lev).exists():
               Phset = PhTest.objects.filter(ph_level = lev)
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



               return JsonResponse({"ph1":ph1.ph_char,"ph1_path":ph1.ph_path,"ph2":ph2.ph_char,"ph2_path":ph2.ph_path,"answer":Phset[answer].ph_char,"code":1},status=200)
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
            if PhTest.objects.filter(ph_char = ph1).exists():
                p1 = PhTest.objects.get(ph_char=ph1)
                if PhTest.objects.filter(ph_char=ph2).exists():
                    p2 = PhTest.objects.get(ph_char=ph2)

                    message = "답이 틀렸습니다."
                    is_correct = "false"
                    if stu_answer == ori_answer :
                        message = "답이 맞았습니다."
                        is_correct = "true"

                    StuPh.objects.create(
                        stu = student,
                        ph1 = p1,
                        ph2 = p2,
                        is_correct = is_correct
                    )

                    return JsonResponse({"message":message,"code":1},status=200)
                return JsonResponse({"message":"ph2가 존재하지 않습니다.","code":2},status=200)
            return JsonResponse({"message":"ph1이 존재하지 않습니다.","code":3},status=200)
        return JsonResponse({"message":"해당 학습자가 존재하지 않습니다.","code":4},status=200)

class FocGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)

        s_id = data['s_id']
        level = data['level']

        if Student.objects.filter(pk=s_id).exists():
            student = Student.objects.get(pk=s_id)
            if FocTest.objects.filter(foc_level = level).exists():
                cur = 0 
                if StuFocArr.objects.filter(stu = s_id ).exists():
                    sfa = StuFocArr.objects.get(stu=s_id)
                    cur = sfa.stucnt
                    if cur == 4:
                        new_list = []
                        r_num = random.randrange(4)
                        for i in range(4):
                            while r_num in new_list:
                                r_num = random.randrange(4)
                            new_list.append(r_num)
                        sfa.o0 = new_list[0]
                        sfa.o1 = new_list[1]
                        sfa.o2 = new_list[2]
                        sfa.o3 = new_list[3]
                        sfa.stucnt = 0
                        sfa.save()
                        cur = 0 
                else:
                    new_list = []
                    r_num = random.randrange(4)
                    for i in range(4):
                        while r_num in new_list:
                            r_num = random.randrange(4)
                        new_list.append(r_num)
                    StuFocArr.objects.create(
                        stu = student,
                        o0 = new_list[0],
                        o1 = new_list[1],
                        o2 = new_list[2],
                        o3 = new_list[3],
                        stucnt = 0
                    )
                
                sfa = StuFocArr.objects.get(stu=s_id)
                conv_id = -1
                if cur == 0:
                    conv_id = sfa.o0
                elif cur == 1:
                    conv_id = sfa.o1
                elif cur == 2:
                    conv_id = sfa.o2
                elif cur ==3:
                    conv_id = sfa.o3
                foc = FocTest.objects.get(foc_level = level , foc_conv_id = conv_id)
                sfa.stucnt = cur +1
                sfa.save()
                return JsonResponse({"sound" : foc.foc_id,"sound_path": foc.foc_voice,"code":1},status=200)
            return JsonResponse({"message":"해당 레벨에 해당하는 문제가 없습니다.","code":2},status=200)
        return JsonResponse({"message":"해당 학습자가 없습니다.","code":3},status=200)
                
# class FocAns:
#     @csrf_exempt
#     def post(self,request):
#         data = json.loads(request.body)


