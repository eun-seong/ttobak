# Front-end
## 구조
**Container-Presenter** 구조     
`Container` : 화면에 보이는 것 외에 로직을 담고 있음    
`Presenter` : 화면에 보여지는 것들을 담고 있음    
`api`       : RESTful API 관련 함수   

## Router
#### Root(/root)
* [로그인(/signin)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/root/signin)
* [회원 가입(/signup)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/root/signup)
* [비밀번호 찾기(/forgotpassword)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/root/forgotpassword)
* [학습자 추가(/addstd)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/root/addstd)
* [학습자 선택(/selecticon)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/root/selecticon)

#### Main(/main)
* [메인 화면(/main)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/main/main)
* [학습 선택 하기(/select)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/main/select)

#### Diagnose(/diagnose)
* [음운 인식 능력(/recognition)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/diagnose/recognition)
* [선택적 집중력(/attention)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/diagnose/attention)
* [음운청취력(/sweep)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/diagnose/sweep)
* [검사 결과(/result)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/diagnose/result)

#### Therapy(/therapy)
* [음절 수 계산(/counting)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/therapy/counting)
* [음운 인식(/phoneme)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/therapy/phoneme)
* [따라 읽기(/shadowing)](http://ec2-13-125-100-8.ap-northeast-2.compute.amazonaws.com:8000/therapy/shadowing)


## 스타일링
`styled-component`를 사용하여 `css` 적용
# 화면
## 검사
1. 청각처리능력
2. 어음청취력 
### 청각처리능력(Sweep)
![청각처리_속도](/uploads/b2f153a13ca9d9218384d09e68cfcc1d/7_청각처리_속도.png)
1. `올라가는 소리`와 `내려가는 소리`를 차례대로 들려준다.
2. 학습자는 그 소리를 들은 후 차례대로 버튼을 누른다.
3. 정답 상자에 학습자가 누른 답이 표시된다.
4. 소리의 속도를 점점 빠르게 1-3번을 반복한다.
### 어음청취력
![어음청취력](/uploads/870681955b1d01fe892983d5b3c1722c/8_어음청취력.png)
1. 비슷한 소리의 음소를 가진 한 음절을 각 상자에서 들려준다.    
예시) /마/ 와 /바/
2. 또박이가 내는 소리를 들려준다.
3. 학습자는 또박이가 내는 소리와 같은 소리가 나는 상자를 찾아 클릭한다.
## 치료
1. 따라 읽기
2. 음절 수 계산
3. 음소 인지 
### 따라 읽기
![따라_읽기](/uploads/565221dd38369baf8b8b37c83dda2263/13_따라_읽기.png)
1. 동시/동요/동화의 텍스트를 띄운다.
2. 성우 목소리를 들려준다.
3. 학습자는 그 목소리를 듣고 따라한다.
4. 학습자의 발화를 녹음한 후 발음 정확도를 계산한다.
### 음절 수 계산
![음절수_세기](/uploads/042f7dea22e960563d4d51437ce82594/14_음절수_세기.png)
1. 또박이가 단어를 들려준다.
2. 학습자는 단어를 듣고 단어의 음절 수를 계산한다.
3. 학습자는 사과나무에서 음절 수만큼 사과를 드래그해 바구니에 담는다.
### 음소 인지
![음소인지](/uploads/f4c1f3b7996d7836a27c0d8011c6445c/15_음소인지.png)
1. 그림카드와 함께 단어를 들려준다.
2. 원숭이가 각자 들고 있는 음소의 소리를 들려준다.
3. 학습자는 원숭이가 들고 있는 음소 중 단어의 첫소리와 같은 것을 찾아 클릭한다.

