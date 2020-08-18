from django.urls import path
from .views import MakeUser,LogIn,UserModify,UserDelete,UserGet,StuAdd,StuModify,StuDel,StuGet

urlpatterns = [
    path('',MakeUser.as_view()),
    path('user/register',MakeUser.as_view()),
    path('user/sign_in',LogIn.as_view()),
    path('user/modify',UserModify.as_view()),
    path('user/delete',UserDelete.as_view()),
    path('user/get',UserGet.as_view()),
    path('student/add',StuAdd.as_view()),
    path('student/modify',StuModify.as_view()),
    path('student/delete',StuDel.as_view()),
    path('student/get',StuGet.as_view())
]