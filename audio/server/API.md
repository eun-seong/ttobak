# 또박이-AUDIO API 정의 문서

API Document for **또박이**
**Markdown** 으로 작성되었습니다   


## Part 1 - DB

DB에 student나 과정이 추가될 때마다 호출해야 하는 API

**user**   

* **URL**   
    /api/user/update
* **Method**   
    `POST`
* **Data Params**   
    `uid=[alphanumeric] | name=[alphanumeric] | gender=['m' or 'f']` 
* **Success Response**   
    * Code: 200
      Content: `{'request': '/api/user/update', 'status': 'Success'}`
* **Error Response**   
    * uid, name, gender가 data param에 없을 때
      Content: `{'request': '/api/user/update', 'status': 'Fail', 'error': 'Insufficient Parameters'}`
    * uid, name, gender field가 비어있을 때
      Content: `{'request': '/api/user/update', 'status': 'Fail', 'error': 'Parameter is not filled'}`
    * gender field가 'm'이나 'f'가 아닐 때
      Content: `{'request': '/api/user/update', 'status': 'Fail', 'error': 'Invalid Parameters'}`

**transcript**   

* **URL**   
    /api/transcript/update
* **Method**   
    `POST`
* **Data Params**   
    `transcript="[alphanumeric]" | course=[alphanumeric]`
* **Success Response**   
    * Code: 200
      Content: `{'request': '/api/transcript/update', 'status': 'Success'}`
* **Error Response**   
    * transcript나 course가 data param에 없을 때   
      Content: `{'request': '/api/transcript/update', 'status': 'Fail', 'error': 'Insufficient Parameters'}`
    * transcript나 course가 비어있을 때   
      Content: `{'request': '/api/transcript/update', 'status': 'Fail', 'error': 'Parameter is not filled'}`
    * 서버 내 처리에서 문제가 생겼을 때   
      Content: `{'request': '/api/transcript/update', 'status': 'Fail', 'error': 'Processing error'}`

## Part2 - GOP

발음 정확도 계산을 위해 호출해야 하는 API

**score**   

* **URL**   
    /api/score
* **Method**   
    `POST`
* **Data Params**   
    `course=[alphanumeric] | user=[alphanumeric] | file=[file]` 
* **Success Response**   
    * Code: 200
      Content: `{'request': '/api/score', 'status': 'Success', 'score': [float]}`
* **Error Response**   
    * course, user, file이 data param에 없을 때   
      Content: `{'request': '/api/score', 'status': 'Fail', 'error': 'Insufficient Parameters'}`
    * course, user field가 비어있을 때   
      Content: `{'request': '/api/score', 'status': 'Fail', 'error': 'Parameter is not filled'}`
    * 파일이 적절한 타입이 아닐 때   
      Content: `{'request': '/api/score', 'status': 'Fail', 'error': 'Invalid extensions'}`
    * 서버 내 처리에서 문제가 생겼을 때   
      Content: `{'request': '/api/score', 'status': 'Fail', 'error': 'Processing error'}`