from django.db import models


# class ConvQues(models.Model):
#     conv_id = models.IntegerField(null=True)
#     ques = models.ForeignKey('FocQues',on_delete=models.PROTECT,null=True,db_column='ques_id')


#     class Meta:
#         db_table = 'conv_ques'


# class FocQues(models.Model):
#     ques_id = models.AutoField(primary_key=True)
#     question = models.CharField(max_length=255,null=True)
#     a_1 = models.CharField(max_length=255)
#     a_2 = models.CharField(max_length=255)
#     a_3 = models.CharField(max_length=255)
#     a_4 = models.CharField(max_length=255)
#     r_a = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'foc_ques'
 

# class FocTest(models.Model):
#     foc_id = models.AutoField(primary_key=True)
#     foc_level = models.IntegerField()
#     foc_voice = models.CharField(max_length=255)
#     #foc_conv_id = models.IntegerField()

#     class Meta:
#         db_table = 'foc_test'

class FocScript(models.Model):
    fs_id = models.AutoField(primary_key=True)
    conv_id = models.IntegerField()
    script = models.CharField(max_length = 1000)

    class Meta:
        db_table = 'foc_script'

class Icon(models.Model):
    ic_id = models.AutoField(primary_key=True)
    ic_path = models.CharField(max_length=255)

    class Meta:
        db_table = 'icon'


# class PhTest(models.Model):
#     ph_id = models.AutoField(primary_key=True)
#     ph_level = models.IntegerField()
#     ph_char = models.CharField(max_length=5)
#     ph_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'ph_test'


# class StuFoc(models.Model):
#     sf_id = models.AutoField(primary_key=True)
#     stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     foc = models.ForeignKey('FocTest', on_delete=models.PROTECT,null=True,db_column = 'foc_id')
#     is_correct = models.CharField(max_length=5)
#     sf_date = models.DateField(auto_now_add = True)

#     class Meta:
#         db_table = 'stu_foc'

class StuFocArr(models.Model):
    sfarr_id = models.AutoField(primary_key=True)
    stu = models.ForeignKey('Student',on_delete = models.PROTECT,null=True,db_column = 'stu_id')
    o0 = models.IntegerField()
    o1 = models.IntegerField()
    o2 = models.IntegerField()
    o3 = models.IntegerField()
    stucnt = models.IntegerField(default = 0)

    class Meta:
        db_table = 'stu_foc_arr'

class StuIc(models.Model):
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True,db_column = 'stu_id')
    ic = models.ForeignKey('Icon', on_delete=models.PROTECT,null=True,db_column = 'ic_id')
    class Meta:
        db_table = 'stu_ic'


# class StuPh(models.Model):
#     sp_id = models.AutoField(primary_key=True)
#     stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     ph1 = models.ForeignKey('PhTest', on_delete=models.PROTECT,null=True,related_name='ph1')
#     ph2 = models.ForeignKey('PhTest', on_delete=models.PROTECT,null=True,related_name='ph2')
#     is_correct = models.CharField(max_length=5)
#     sp_date = models.DateField(auto_now_add = True)

#     class Meta:
#         db_table = 'stu_ph'


# class StuSwp(models.Model):
#     ss_id = models.AutoField(primary_key=True)
#     stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     swp = models.ForeignKey('SwpTest', on_delete=models.PROTECT,null=True,db_column = 'swp_id')
#     is_correct = models.CharField(max_length=5)
#     ss_date = models.DateField(auto_now_add = True)

#     class Meta:
#         db_table = 'stu_swp'


class Student(models.Model):
    stu_id = models.AutoField(primary_key=True)
    stu_name = models.CharField(max_length=255)
    stu_birth = models.DateField(null=True)
    stu_gender = models.CharField(max_length=5)
    regi_date = models.DateField(auto_now_add = True)
    modi_date = models.DateField(auto_now = True)

    class Meta:
        db_table = 'student'


# class SwpTest(models.Model):
#     swp_id = models.AutoField(primary_key=True)
#     swp_level = models.IntegerField()
#     swp_freq = models.IntegerField()
#     swp_uppath = models.CharField(max_length=255)
#     swp_downpath = models.CharField(max_length=255)

#     class Meta:
#         db_table = 'swp_test'


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

    usr = models.ForeignKey('User', on_delete=models.PROTECT,null=True,db_column = 'usr_id')
    stu = models.ForeignKey('Student', on_delete=models.PROTECT,null=True,db_column = 'stu_id')

    class Meta:
        db_table = 'usr_stu'

# class PoCure(models.Model):
#     po_id = models.AutoField(primary_key=True)
#     po_level = models.IntegerField()
#     po_tid = models.IntegerField()
#     po_text = models.CharField(max_length = 255)
#     po_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "po_cure"

# class StuPo(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     po = models.ForeignKey('PoCure',on_delete=models.PROTECT,null=True,db_column='po_id')
#     sp_score = models.IntegerField()
#     sp_date = models.DateField(auto_now_add=True)

#     class Meta:
#         db_table = "stu_po"

# class TxtCure(models.Model):
#     txt_id = models.AutoField(primary_key=True)
#     txt_tid = models.IntegerField()
#     txt_text = models.CharField(max_length = 255)
#     txt_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "txt_cure"

# class StuTxt(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     txt = models.ForeignKey('TxtCure',on_delete=models.PROTECT,null=True,db_column='txt_id')
#     st_score = models.IntegerField()
#     st_date = models.DateField(auto_now_add=True)
    
#     class Meta:
#         db_table = "stu_txt"
        
# class SelfCure(models.Model):
#     self_id = models.AutoField(primary_key=True)
#     self_tid = models.IntegerField()
#     self_text = models.CharField(max_length = 255)
    
#     class Meta:
#         db_table = "self_cure"

# class StuSelf(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     slf = models.ForeignKey('SelfCure',on_delete=models.PROTECT,null=True,db_column='self_id')
#     ss_score = models.IntegerField()
#     ss_date = models.DateField(auto_now_add=True)
    
#     class Meta:
#         db_table = "stu_self"

# class VowCure(models.Model):
#     vow_id = models.AutoField(primary_key=True)
#     vow_level = models.IntegerField()
#     vow_text = models.CharField(max_length = 255)
#     vow_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "vow_cure"

# class StuVow(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     vow = models.ForeignKey('VowCure',on_delete=models.PROTECT,null=True,db_column='vow_id')
#     sv_score = models.IntegerField()
#     sv_date = models.DateField(auto_now_add=True)
    
#     class Meta:
#         db_table = "stu_vow"

# class VowsCure(models.Model):
#     vows_id = models.AutoField(primary_key=True)
#     vows_level = models.IntegerField()
#     vows_answer = models.CharField(max_length = 10)
#     vows_ex = models.CharField(max_length=10)
#     vows_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "vows_cure"

# class StuVows(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     vows = models.ForeignKey('VowsCure',on_delete=models.PROTECT,null=True,db_column='vows_id')
#     sv_iscorrect = models.CharField(max_length=10)
#     sv_date = models.DateField(auto_now_add=True)
    
#     class Meta:
#         db_table = "stu_vows"

# class CountCure(models.Model):
#     count_id = models.AutoField(primary_key=True)
#     count_word = models.CharField(max_length = 10)
#     count_len = models.IntegerField()
#     count_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "count_cure"

# class StuCount(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column = 'stu_id')
#     count = models.ForeignKey('CountCure',on_delete=models.PROTECT,null=True,db_column='count_id')
#     sc_iscorrect = models.CharField(max_length=10)
#     sc_sans = models.IntegerField()
#     sc_date = models.DateField(auto_now_add=True)
    
#     class Meta:
#         db_table = "stu_count"

# class ComCure(models.Model):
#     com_id = models.AutoField(primary_key=True)
#     com_level = models.IntegerField()
#     com_w1 = models.CharField(max_length=10)
#     com_w2 = models.CharField(max_length=10)
#     com_w3 = models.CharField(max_length=10)
#     com_e1 = models.CharField(max_length=10)
#     com_e2 = models.CharField(max_length=10)
#     com_e3 = models.CharField(max_length=10)
#     com_e4 = models.CharField(max_length=10)
#     com_ans = models.CharField(max_length=10)
#     com_w1path = models.CharField(max_length=255)
#     com_w2path = models.CharField(max_length=255)
#     com_w3path = models.CharField(max_length=255)
#     com_e1path = models.CharField(max_length=255)
#     com_e2path = models.CharField(max_length=255)
#     com_e3path = models.CharField(max_length=255)
#     com_e4path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "com_cure"

# class StuCom(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column='stu_id')
#     com = models.ForeignKey('ComCure',on_delete=models.PROTECT,null=True,db_column='com_id')
#     sc_iscorrect = models.CharField(max_length=10)
#     sc_sans = models.IntegerField()
#     sc_date = models.DateField(auto_now_add=True)

#     class Meta:
#         db_table = "stu_com"

# class MatCure(models.Model):
#     mat_id = models.AutoField(primary_key=True)
#     mat_word = models.CharField(max_length=10)
#     mat_spath = models.CharField(max_length=255)
#     mat_cpath = models.CharField(max_length=255)

#     class Meta:
#         db_table = "mat_cure"

# class StuMat(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column='stu_id')
#     mat1 = models.ForeignKey('MatCure', on_delete=models.PROTECT,null=True,related_name='mat1')
#     mat2 = models.ForeignKey('MatCure', on_delete=models.PROTECT,null=True,related_name='mat2')
#     mat3 = models.ForeignKey('MatCure', on_delete=models.PROTECT,null=True,related_name='mat3')
#     sc_iscorrect = models.CharField(max_length=10)
#     sc_sans = models.IntegerField()
#     sc_date = models.DateField(auto_now_add=True)

#     class Meta:
#         db_table = "stu_mat"

# class ConsCure(models.Model):
#     cons_id = models.AutoField(primary_key=True)
#     cons_word = models.CharField(max_length=10)
#     cons_path = models.CharField(max_length=255)
#     cons_e1 = models.CharField(max_length=5)
#     cons_e2 = models.CharField(max_length=5)
#     cons_ans = models.CharField(max_length =5)
#     cons_level = models.IntegerField()

#     class Meta:
#         db_table = "cons_cure"

# class StuCons(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column='stu_id')
#     cons = models.ForeignKey('ConsCure', on_delete=models.PROTECT,null=True,db_column='cons_id')
#     sc_iscorrect = models.CharField(max_length=10)
#     sc_date = models.DateField(auto_now_add=True)

#     class Meta:
#         db_table = "stu_cons"

# class ConwCure(models.Model):
#     conw_id = models.AutoField(primary_key=True)
#     conw_word = models.CharField(max_length=10)
#     conw_level = models.IntegerField()

#     class Meta: 
#         db_table = "conw_cure"

# class StuConw(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column='stu_id')
#     conw = models.ForeignKey('ConwCure', on_delete=models.PROTECT,null=True,db_column='conw_id')
#     sc_score = models.IntegerField()
#     sc_date = models.DateField(auto_now_add=True)

#     class Meta:
#         db_table = "stu_conw"

# class ConrCure(models.Model):
#     conr_id = models.AutoField(primary_key=True)
#     conr_level = models.IntegerField()
#     conr_ans = models.CharField(max_length=10)
#     conr_sam = models.CharField(max_length=10)
#     conr_path = models.CharField(max_length=255)

#     class Meta:
#         db_table = "conr_cure"

# class StuConr(models.Model):
#     stu = models.ForeignKey('Student',on_delete=models.PROTECT,null=True,db_column='stu_id')
#     conr = models.ForeignKey('ConrCure', on_delete=models.PROTECT,null=True,db_column='conr_id')
#     sc_iscorrect = models.IntegerField()
#     sc_date = models.DateField(auto_now_add=True)

#     class Meta:
#         db_table = "stu_conr"

class TestIdx(models.Model):
    idx_id = models.AutoField(primary_key = True)
    idx_txt = models.CharField(max_length = 10)

    class Meta:
        db_table = "test_idx"

class TestMaster(models.Model):
    ques_id = models.AutoField(primary_key = True)
    test_idx = models.ForeignKey('TestIdx',on_delete=models.PROTECT,null=True,db_column = 'idx_id')
    ques_level = models.IntegerField() #question level
    ques_path1 = models.CharField(max_length=255) #voice path1
    ques_path2 = models.CharField(max_length=255,null=True) #voice path2(swp_only)
    ques_int = models.IntegerField(null=True) #frequency for swp
    ques_char = models.CharField(max_length = 10,null=True) #character for ph

    class Meta:
        db_table = "test_master"

class StuTest(models.Model):
    stu = models.ForeignKey('Student',on_delete = models.PROTECT,null=True,db_column='stu_id')
    ques = models.ForeignKey('TestMaster',on_delete=models.PROTECT,null=True,related_name='ques_normal')
    ques2 = models.ForeignKey('TestMaster',on_delete = models.PROTECT,null=True,related_name = 'ques_ph')
    T_OR_F = (
        ('Y',"yes"),
        ('N',"no"),
    )
    test_txt = models.CharField(max_length=10,null=True)
    is_correct = models.CharField(max_length=1,choices = T_OR_F)
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = "stu_test"