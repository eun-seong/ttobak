# 또박이 API 정의 문서

API Document for **또박이** 
추후에 API가 개발되게 되면, 각 API 디렉토리 별로 나뉘어질 예정입니다. 
**Markdown** 으로 작성되었습니다. 

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
* **Success Response:**

	* **Code:** 200 <br />
     **Content:** `{ 'message' : '성공적으로 회원가입 되었습니다.' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Invalid data input" }`

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
    **Content:** `{ 'u_id' : user id(integer) }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Not a registered user" }`

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
    **Content:** `{ message : '성공적으로 변경되었습니다.' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Not a registered user" }`

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
    **Content:** `{ message : '성공적으로 삭제 되었습니다.' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Not a registered user" }`

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
	* the deletion of the students belong to the designated user should be preceded 

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
	  `u_id = [integer]`
	  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ name : 'name', email : 'email@email.com' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Not a registered user" }`

 
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
    **Content:** `{ message : '성공적으로 추가 되었습니다.' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Invalid input" }`

  OR
	* **Code:** 403 Not authorized <br />
    **Content:** `{ error : "Not a registered user. Please log-in again" }`

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
    **Content:** `{ message : '성공적으로 수정 되었습니다.' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Invalid input" }`

  OR
	* **Code:** 403 Not authorized <br />
    **Content:** `{ error : "Not a registered user. Please log-in again" }`

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
    **Content:** `{ message : '성공적으로 삭제 되었습니다.' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Student not exist" }`

  OR
	* **Code:** 403 Not authorized <br />
    **Content:** `{ error : "Not a registered user. Please log-in again" }`

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
    **Content:** `{ name : 'student name', birth : 'date-of-birth' , gender : 'gender' }`
 
* **Error Response:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "Not a correct address" }`

  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error : "Student not exist" }`

  OR
	* **Code:** 403 Not authorized <br />
    **Content:** `{ error : "Not a registered user. Please log-in again" }`

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
