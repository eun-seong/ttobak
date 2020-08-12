# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class ConvQues(models.Model):
    conv_id = models.IntegerField(null=True)
    ques = models.ForeignKey('FocQues',on_delete=models.PROTECT,null=True)

    class Meta:
        db_table = 'conv_ques'


class FocQues(models.Model):
    ques_id = models.AutoField(primary_key=True)
    a_1 = models.CharField(max_length=255)
    a_2 = models.CharField(max_length=255)
    a_3 = models.CharField(max_length=255)
    a_4 = models.CharField(max_length=255)
    r_a = models.CharField(max_length=255)

    class Meta:
        db_table = 'foc_ques'
 

class FocTest(models.Model):
    foc_id = models.AutoField(primary_key=True)
    foc_level = models.IntegerField()
    foc_voice = models.CharField(max_length=255)
    foc_conv_id = models.IntegerField()

    class Meta:
        db_table = 'foc_test'


class Icon(models.Model):
    ic_id = models.AutoField(primary_key=True)
    ic_path = models.CharField(max_length=255)

    class Meta:
        db_table = 'icon'


class PhTest(models.Model):
    ph_id = models.AutoField(primary_key=True)
    ph_level = models.IntegerField()
    ph_char = models.CharField(max_length=5)
    ph_path = models.CharField(max_length=255)

    class Meta:
        db_table = 'ph_test'


class StuFoc(models.Model):
    sf_id = models.AutoField(primary_key=True)
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True)
    foc = models.ForeignKey('FocTest', on_delete=models.PROTECT,null=True)
    is_correct = models.CharField(max_length=5)
    sf_date = models.DateField()

    class Meta:
        db_table = 'stu_foc'


class StuIc(models.Model):
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True)
    ic = models.ForeignKey('Icon', on_delete=models.PROTECT,null=True)

    class Meta:
        db_table = 'stu_ic'


class StuPh(models.Model):
    sp_id = models.AutoField(primary_key=True)
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True)
    ph = models.ForeignKey('PhTest', on_delete=models.PROTECT,null=True)
    is_correct = models.CharField(max_length=5)
    sp_date = models.DateField()

    class Meta:
        db_table = 'stu_ph'


class StuSwp(models.Model):
    ss_id = models.AutoField(primary_key=True)
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True)
    swp = models.ForeignKey('SwpTest', on_delete=models.PROTECT,null=True)
    is_correct = models.CharField(max_length=5)
    ss_date = models.DateField()

    class Meta:
        db_table = 'stu_swp'


class Student(models.Model):
    stu_id = models.AutoField(primary_key=True)
    stu_name = models.CharField(max_length=255)
    stu_gender = models.CharField(max_length=5)
    regi_date = models.DateField(auto_now_add = True)
    modi_date = models.DateField(auto_now = True)

    class Meta:
        db_table = 'student'


class SwpTest(models.Model):
    swp_id = models.AutoField(primary_key=True)
    swp_level = models.IntegerField()
    swp_freq = models.IntegerField()
    swp_uppath = models.CharField(max_length=255)
    swp_downpath = models.CharField(max_length=255)

    class Meta:
        db_table = 'swp_test'


class User(models.Model):
    usr_id = models.AutoField(primary_key=True)
    usr_name = models.CharField(max_length=255)
    usr_email = models.CharField(max_length=255,unique=True)
    usr_pw = models.CharField(max_length=255)
    regi_date = models.DateField(auto_now_add=True)
    modi_date = models.DateField(auto_now=True)

    class Meta:
        db_table = 'user'

class UsrStu(models.Model):
    usr = models.ForeignKey('User', on_delete=models.PROTECT,null=True)
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True)

    class Meta:
        db_table = 'usr_stu'