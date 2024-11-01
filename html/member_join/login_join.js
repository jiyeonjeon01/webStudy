function onLoad(){
    //패턴검색
    const idPattern = /^[\w]{3,}$/; //[\w]는 영문자, 숫자, _만 입력 가능 {3,} 3글자이상가능
    const pwdPattern =/^[\w]{6,10}$/; //영문자와 숫자, _ 6~10  
    const namePattern =/^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/; //한글 2~4글자,영문자 2-20 첫글자는대문자 공백가능   
    const nicknamePattern =/^[\w가-힣]{4,}$/;//공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)   
    const emailPattern =/^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
    const telPattern =/^[\d]{2,3}-[\d]{3,4}-[\d]{4}$/; //\d 숫자만가능
    const mobilePattern =/^010-(?:[\d]{3}|[\d]{4})-[\d]{4}$/; //\d 숫자만가능
    const datePattern =/^[\d]{4}-[\d]{2}-[\d]{2}$/; //\d 숫자만가능
    //객체찾기
    const inputID = document.querySelector("#input-id"); 
    const inputPW1 = document.querySelector("#input-pw1"); 
    const inputPW2 = document.querySelector("#input-pw2"); 
    const inputName = document.querySelector("#input-name"); 
    const inputNickname= document.querySelector("#input-nickname"); 
    const inputEmail= document.querySelector("#input-email"); 
    const inputTel= document.querySelector("#input-tel"); 
    const inputMobile= document.querySelector("#input-mobile");
    const inputDate= document.querySelector('#input-date');
    //주소객체찾기
    const zipcode= document.querySelector("#zipcode");
    const addr1= document.querySelector("#addr1");
    const addr2= document.querySelector("#addr2");
    const btnSearchAddr= document.querySelector("#btn-searchAddr");
    //폼객체찾기
    const myform= document.querySelector(".myform");

    //이벤트리스너등록및 핸들러처리
    inputID.addEventListener("blur",()=>validate(inputID, idPattern, "영문자, 숫자, _만 입력 가능" ));
    inputPW1.addEventListener("blur",()=>validate(inputPW1,pwdPattern, "영문자와 숫자, _ 6~10" ));
    inputPW2.addEventListener("blur",()=>{
        validate(inputPW2,pwdPattern, "영문자와 숫자, _ 6~10" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드가 일치하지 않음";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
    });
    inputName.addEventListener("blur",()=>validate(inputName,namePattern, "한글 2~4글자,영문자 2-10 첫글자는대문자 공백가능" ));
    inputNickname.addEventListener("blur",()=>validate(inputNickname,nicknamePattern, "공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)" ));
    inputEmail.addEventListener("blur",()=>validate(inputEmail,emailPattern, "이메일형식 안맞음" ));
    inputTel.addEventListener("blur",()=>validate(inputTel,telPattern, "전화번호형식이 안맞음" ));
    inputMobile.addEventListener("blur",()=>validate(inputMobile,mobilePattern, "모바일전화번호형식이 안맞음" ));
    inputDate.addEventListener("blur",()=>validate(inputDate,datePattern, "날짜를 선택해주세요" ));
    btnSearchAddr.addEventListener("click",()=>{
        new daum.Postcode({
            oncomplete: function(data) {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
              zipcode.value = data.zonecode;
              addr1.value = data.roadAddress;
            }
          }).open();
    });
    //폼 이벤트등록및 핸들러처리
    myform.addEventListener("submit",(e)=>{
        e.preventDefault();  //서버에 전송하는 기본기능막는다.
        validate(inputID, idPattern, "영문자, 숫자, _만 입력 가능" );
        validate(inputPW1,pwdPattern, "영문자와 숫자, _ 6~10" );
        validate(inputPW2,pwdPattern, "영문자와 숫자, _ 6~10" );
        if(inputPW1.value !== inputPW2.value){
            inputPW2.nextSibling.textContent ="패스워드가 일치하지 않음";
            inputPW2.nextSibling.style.color ="red";
            inputPW1.value="";
            inputPW2.value="";
            inputPW1.focus(); 
            return; 
        }
        validate(inputName,namePattern, "한글 2~4글자,영문자 2-10 첫글자는대문자 공백가능" );
        validate(inputNickname,nicknamePattern, "공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)" );
        validate(inputEmail,emailPattern, "이메일형식 안맞음" );
        validate(inputTel,telPattern, "전화번호형식이 안맞음" );
        validate(inputMobile,mobilePattern, "모바일전화번호형식이 안맞음" );
        validate(inputDate,datePattern,"날짜를 선택해주세요");
        if(zipcode.value === "" ||  addr1.value  === ""){
            zipcode.nextSibling.textContent ="주소선택해주세요";
            zipcode.focus();
            return;  
        }
        alert("서버로 전송하겠습니다.");
        myform.submit();  
    });
    //핸들러처리기능    
    function validate(userInput, pattern, message ){
        if(userInput.value.match(pattern)){
            userInput.nextSibling.innerHTML = "성공";
            userInput.nextSibling.style.color ="blue";
           }else{
            userInput.nextSibling.innerHTML = message;
            userInput.nextSibling.style.color ="red";
            userInput.value = "";
            userInput.focus();
            return; 
           }
    }
}