from django.urls import path
from .views import MakeUser,LogIn,UserModify,UserDelete,UserGet,StuAdd,StuModify,StuDel,StuGet,SwpGet,SwpAns,PhGet,PhAns,FocGet

urlpatterns = [ ##만들어준 view들을 경로 지정해서 routing해줌.
    path('',MakeUser.as_view()),
    path('user/register',MakeUser.as_view()),
    path('user/sign_in',LogIn.as_view()),
    path('user/modify',UserModify.as_view()),
    path('user/delete',UserDelete.as_view()),
    path('user/get',UserGet.as_view()),
    path('student/add',StuAdd.as_view()),
    path('student/modify',StuModify.as_view()),
    path('student/delete',StuDel.as_view()),
    path('student/get',StuGet.as_view()),
    path('swp_test/ask',SwpGet.as_view()),
    path('swp_test/answer',SwpAns.as_view()),
    path('ph_test/ask',PhGet.as_view()),
    path('ph_test/answer',PhAns.as_view()),
    path('foc_test/ask',FocGet.as_view())
]