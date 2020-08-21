# Front-end
## 파일 구조
Container-Presenter 구조   
**사진**   


## Router
react-router를 통해 검사 및 치료 라우팅
```javascript
<Switch>
    <Route path="/" exact component={TempMain} />
    <Route path="/diagnose/recognition" component={Recognition} />
    <Route path="/diagnose/attention" component={Attention} />
    <Route path="/diagnose/sweep" component={Sweep} />
    <Route path="/diagnose/result" component={Result} />
    <Route path="/therapy/counting" component={Counting} />
    <Route path="/therapy/phoneme" component={Phoneme} />
    <Route path="/therapy/shadowing" component={Shadowing} />
    <Redirect from="*" to="/" />
</Switch>
```
## 스타일링
`styled-component`를 사용하여 `css` 적용
# 화면
## 검사
### 청각처리능력(Sweep)
`사진`   
1. `올라가는 소리`와 `내려가는 소리`를 차례대로 들려준다.
2. 학습자는 그 소리를 들은 후 차례대로 버튼을 누른다.
3. 정답 상자에 학습자가 누른 답이 표시된다.
4. 소리의 속도를 점점 빠르게 1-3번을 반복한다.
### 어음청취력
`사진`   
1. 비슷한 소리의 음소를 가진 한 음절을 각 상자에서 들려준다.    
예시) /마/ 와 /바/
2. 또박이가 내는 소리를 들려준다.
3. 학습자는 또박이가 내는 소리와 같은 소리가 나는 상자를 찾아 클릭한다.
## 치료
### 따라 읽기
`사진`   
1. 동시/동요/동화의 텍스트를 띄운다.
2. 성우 목소리를 들려준다.
3. 학습자는 그 목소리를 듣고 따라한다.
4. 학습자의 발화를 녹음한 후 발음 정확도를 계산한다.
### 음절 수 계산
`사진`   
1. 또박이가 단어를 들려준다.
2. 학습자는 단어를 듣고 단어의 음절 수를 계산한다.
3. 학습자는 사과나무에서 음절 수만큼 사과를 드래그해 바구니에 담는다.
### 음소 인지
`사진`   
1. 그림카드와 함께 단어를 들려준다.
2. 원숭이가 각자 들고 있는 음소의 소리를 들려준다.
3. 학습자는 원숭이가 들고 있는 음소 중 단어의 첫소리와 같은 것을 찾아 클릭한다.

