import json
import bcrypt
import jwt
from .models  import User,Student,UsrStu

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

class MakeUser(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        
        if User.objects.filter(usr_email=data['email']).exists():
            return JsonResponse({"message":"이미 존재하는 이메일 입니다.","code":2},status=400)

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

            return JsonResponse({"message":"Wrong password","code":2},status=401)

        return JsonResponse({"message":"Not a registered user","code":3},status=400)

class UserModify(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(usr_id=uk)

            if user.usr_email != data['email']:
                if User.objects.filter(usr_email = data['email']).exists():
                    return JsonResponse({"message":"이미 존재하는 이메일입니다","code":1},status=200)
            
            user.usr_email = data['email']
            user.usr_pw = bcrypt.hashpw(data['pw'].encode("UTF-8"),bcrypt.gensalt()).decode("UTF-8")
            user.usr_name = data['name'] 
            user.save()

            return JsonResponse({"message":"변경사항이 저장되었습니다","code":2},status=200)

        return JsonResponse({"message":"존재하지 않는 회원입니다","code":3},status=200)

class UserDelete(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(usr_id=uk)
            user.delete()

            return JsonResponse({"message":"성공적으로 삭제되었습니다.","code":1},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다","code":2},status=200)

class UserGet(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        uk = data['id']

        if User.objects.filter(usr_id = uk).exists():
            user = User.objects.get(usr_id=uk)

            return JsonResponse({"name":user.usr_name,"email":user.usr_email},status=200)

        return JsonResponse({"message":"존재하지 않는 회원입니다","code":2},status=200)

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

            return JsonResponse({"message":"성공적으로 추가되었습니다","code":1},status=200)

        return JsonResponse({"message":"존재하지 않는 회원입니다","code":2},status=200)

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

                return JsonResponse({"message":"성공적으로 수정되었습니다","code":1},status=200)
            return JsonResponse({"message":"존재하지 않는 학습자 입니다","code":2},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다","code":3},status=200)


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

                student = Student.objects.get(pk=sk)
                student.delete()
                return JsonResponse({"message":"성공적으로 삭제되었습니다","code":1},status=200)
            return JsonResponse({"message":"존재하지 않는 학습자 입니다","code":2},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다","code":3},status=200)

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
            return JsonResponse({"message":"존재하지 않는 학습자 입니다","code":2},status=200)
        return JsonResponse({"message":"존재하지 않는 회원입니다","code":3},status=200)