import json
import bcrypt
import jwt
from .models  import User

from django.views import View
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

class MakeUser(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)
        
        if User.objects.filter(usr_email=data['email']).exists():
            return JsonResponse({"message":"이미 존재하는 이메일 입니다."},status=400)

        User.objects.create(
            usr_name=data['name'],
            usr_email=data['email'],
            usr_pw= bcrypt.hashpw(data['pw'].encode("UTF-8"),bcrypt.gensalt()).decode("UTF-8")
        ).save()

        return JsonResponse({"message":"성공적으로 회원가입 되었습니다."},status=200)


class LogIn(View):
    @csrf_exempt
    def post(self,request):
        data = json.loads(request.body)

        if User.objects.filter(usr_email=data['email']).exists():
            user = User.objects.get(usr_email=data['email'])

            if bcrypt.checkpw(data['pw'].encode("UTF-8"),user.usr_pw.encode("UTF-8")):
                return JsonResponse({"usr_id":user.usr_id},status=200)

            return JsonResponse({"message":"Wrong password"},status=401)

        return JsonResponse({"message":"Not a registered user"},status=400)