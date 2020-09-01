# 또박이 API 정의 문서

API Document for **또박이** 
All of the APIs include responses automatically created by server. i.e) 404 not found / 500 Internal Server Error / etc..

## Part 1 -  USER

**register**
----
* **URL**
	/user/register

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `email=[alphanumeric]` |  `pw = [alphanumeric]` | `name = [alphanumeric]`
* **Response:**

	* **Code:** 200 <br />
     **Content:** `{ "message" : '성공적으로 회원가입 되었습니다.',"code": 1 }`

OR

  * **Code:** 200<br />
    **Content:** `{ "message" : "이미 존재하는 이메일입니다.","code":2 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/users/register",
      dataType: "json",
      type : "POST",
      data : { 
	    "email" : sample@sample.comm
		  "pw" : password,
		  "name" : name
		},success : function(r) {
        console.log(r);
      }
    });
    ```

 
 **signin**
----
* **URL**
	/user/signin

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `email=[alphanumeric]` |  `pw = [alphanumeric]` 
* **Success Response:**  
   
   * **Code:** 200 <br />
    **Content:** `{ "usr_id" : [integer],"code" : 1  }`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message": "비밀번호가 일치하지 않습니다.", "code":2 }`

  OR
  
  * **Code:** 200 <br  />
  **Content:**  `{"message": "가입된 메일 주소가 존재하지 않습니다. " , "code" : 3}`


* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/users/signin",
      dataType: "json",
      type : "POST",
      data : { 
	     "email" : sample@sample.comm
		   "pw" : password,
		},success : function(r) {
         console.log(r)
      }
    });

 **modify**
----
* **URL**
	/user/modify

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `email=[alphanumeric]` |  `pw = [alphanumeric]`  | `name =[alphanumeric]` | `id = [integer]`
* **Success Response:**  
  
  * **Code:** 200 <br />
    **Content:** `{ "message" : "변경사항이 저장되었습니다.","code" : 1 }`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "이미 존재하는 이메일입니다.","code":2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다.","code":3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/users/modify",
      dataType: "json",
      type : "POST",
      data : { 
	     "email" : sample@sample.comm
		   "pw" : password,
		   "name" : name
		},success : function(r) {
	         console.log(r)
      }
    });

 **delete**
----
* **URL**
	/user/delete

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `id=[integer]`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message" : "성공적으로 삭제 되었습니다.","code":1}`
 
OR 

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다." , "code": 2 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/users/delete",
      dataType: "json",
      type : "POST",
      data : { 
	     "id" : 0
		},success : function(r) {
         alert(r['message'])
      }
    });

* **Extra notes**
	* the deletion of the students and related tables' instances belong to the designated user should be preceded 

 **get**
----
* **URL**
	/user/get

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `id = [integer]`
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "name" : [alphanumeric], "email" : [alphanumeric], "code" : 1 }`
 
OR 

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다.","code" :2 }`

 
* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/user/get",
      dataType: "json",
      type : "POST",
      data : { 
	     "u_id" : 0,
		},success : function(r) {
	         console.log(r)
      }
    });

## Part2 - Student

 **add**
----
* **URL**
	/student/add

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `name=[alphanumeric]` | `birth=[date]` | `gender=[alphanumeric]` | `u_id = [integer]`
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message" : "성공적으로 추가 되었습니다.","code" : 1 }`
 
OR 

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다.", "code" :2 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/student/add",
      dataType: "json",
      type : "POST",
      data : { 
	     "u_id" : 0,
	     "name" : "홍길동",
	     "birth" : "1998-08-11",
	     "gender" : "female",
		},success : function(r) {
	         console.log(r)
      }
    });
    
 **modify**
----
* **URL**
	/student/modify

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	  `name=[alphanumeric]` | `birth=[date]` | `gender=[alphanumeric]` | `s_id = [integer]` | `u_id = [integer]`
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message" : "성공적으로 수정 되었습니다." "code" : 1 }`
 
OR 

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 학습자 입니다.","code" : 2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다.", "code":3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/student/modify",
      dataType: "json",
      type : "POST",
      data : { 
	     "s_id" : 1,
	     "u_id" : 0,
	     "name" : "홍길동",
	     "birth" : "1998-08-11",
	     "gender" : "female",
		},success : function(r) {
	         console.log(r)
      }
    });

 **delete**
----
* **URL**
	/student/delete

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	 `s_id = [integer]` | `u_id = [integer]`
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message" : "성공적으로 삭제 되었습니다.","code" :1  }`

OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 학습자입니다. ", "code" : 2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다." ,"code" : 3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/student/delete",
      dataType: "json",
      type : "POST",
      data : { 
	     "s_id" : 1,
	     "u_id" : 0,
		},success : function(r) {
	         console.log(r)
      }
    });
    
 **get**
----
* **URL**
	/student/get

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	   `s_id = [integer]` | `u_id = [integer]`
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "name": [string], "birth" : [date] , "gender" : ['male' or 'female'],"code":1 }`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 학습자 입니다.", "code" : 2  }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "존재하지 않는 회원입니다.","code" : 3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/student/get",
      dataType: "json",
      type : "POST",
      data : { 
	     "s_id" : 1,
	     "u_id" : 0,
		},success : function(r) {
	         console.log(r)
      }
    });    
   

## Part3 - Swp_Test

 **ask**
----
* **URL**
	/swp_test/ask

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	   `freq = [integer]` | `level = [integer] | s_id = [integer]` 
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "up_path" : [path_to_up_sound], "down_path" : [path_to_down_path] , "answer1" : [up or down] , "answer2" : [up or down], "swp_id" : [integer],"code":1}`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message"  : "해당문제가 존재하지 않습니다.","code": 2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 학습자가 존재하지 않습니다.","code": 3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/swp_test/ask",
      dataType: "json",
      type : "POST",
      data : { 
	     "freq" : 500,
	     "level" : 1,
	     "s_id" : 1
		},success : function(r) {
	         console.log(r)
      }
    });   

 **answer**
----
* **URL**
	/swp_test/answer

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	   `s_id = [integer]` | `swp_id = [integer] | ori_answer1 = [up/down] | ori_answer2 = [up/down] | stu_answer1 =[up/down] | stu_answer = [up/down] ` 
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message" : ["답이 맞았습니다." or "답이 틀렸습니다."] }`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 문제가 없습니다.","code" : 2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 학습자가 없습니다." ,"code" : 3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/swp_test/answer",
      dataType: "json",
      type : "POST",
      data : { 
	     "s_id" : 1,
	     "swp_id" : 1,
	     "ori_answer1" : "up",
	     "ori_answer2" : "up",
	     "stu_answer1" : "up",
	     "stu_answer2" : down
		},success : function(r) {
	         console.log(r)
      }
    });   


## Part4 - Ph_Test

 **ask**
----
* **URL**
	/ph_test/ask

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	   `level = [integer]| s_id = [integer]` 
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "ph1" : [character], "ph1_path" : [path_to_ph1] , "ph2" : [character] , "ph2_path" : [path_to_ph2], "answer" : [character],"code":1}`
 
OR 

  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 레벨의 문제가 존재하지 않습니다.","code":2 }`

  OR

  * **Code:** 200<br />
    **Content:** `{ "message" : "해당 학습자가 없습니다.","code":3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/ph_test/ask",
      dataType: "json",
      type : "POST",
      data : { 
	     "level" : 1,
	     "s_id" : 1
		},success : function(r) {
	         console.log(r)
      }
    });   

 **answer**
----
* **URL**
	/ph_test/answer

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	   `s_id = [integer]` | `ph1 = [character] | ph2 = [character] | stu_answer = [character] | ori_answer = [character] ` 
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message" : ["답이 맞았습니다" or "답이 틀렸습니다."],"code":1 }`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "ph2가 존재하지 않습니다.","code" : 2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "ph1이 존재하지 않습니다.","code":3 }`

  OR
  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 학습자가 존재하지 않습니다.","code":4 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/swp_test/answer",
      dataType: "json",
      type : "POST",
      data : { 
	     "s_id" : 1,
	     "ph1" : "귀",
	     "ph2" : "남"
	     "ori_answer" : "귀",
	     "stu_answer" : "남",
		},success : function(r) {
	         console.log(r)
      }
    });   

## Part5 - foc_Test

 **ask**
----
* **URL**
	/foc_test/ask

* **Method:**
	  `POST`
*  **URL Params**
   **Required:**
   **Optional:**

* **Data Params**
	   `level = [integer] | s_id = [integer] `
		  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "sound": [integer], "sound_path" : [path_to_sound_path],"code":1}`
 
OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 레벨에 해당하는 문제가 없습니다.","code":2 }`

  OR

  * **Code:** 200 <br />
    **Content:** `{ "message" : "해당 학습자가 없습니다.","code: 3 }`

* **Sample Call:**
  ```javascript
    $.ajax({
      url: "link/to/api/foc_test/ask",
      dataType: "json",
      type : "POST",
      data : { 
	     "level" : 1,
	     "s_id" : 1
		},success : function(r) {
	         console.log(r)
      }
    });   

 ~~**answer**~~
----
The test method itself has changed a bit. Need to be re-written.



