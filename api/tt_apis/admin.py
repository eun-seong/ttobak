from django.contrib import admin
from .models import User,Student,UsrStu,SwpTest,StuSwp

admin.site.register(User)
admin.site.register(Student)
admin.site.register(UsrStu)
admin.site.register(SwpTest)
admin.site.register(StuSwp) ##admin site에서 관리할 수 있도록 모델들을 admin site에 추가해줌.
# Register your models here.
