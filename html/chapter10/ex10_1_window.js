// 내 버전 
// function onLoad() {
//     // 객체 찾기
//     const btnOpen = document.querySelector("#open");
//     const btnClose = document.querySelector("#close");
//     const idobj = document.querySelector("#userid");
//     const pwd = document.querySelector("#pwd");
//     // 팝업창의 윈도우 핸들 변수  
//     let winHandle = null;

//     // 이벤트 리스너 등록 및 핸들러 처리
//     btnOpen.addEventListener("click", () => {
//         winHandle = window.open("./ex10_1_window_open_popup.html", "_blank", "width=400, height=400, left=30, top=30");
//         winHandle.onload = () => {
//             const userid = winHandle.document.querySelector("#userid");
//             userid.value = idobj.value; // 아이디 값을 팝업으로 전달
            
//             pwd.value = pwd.value; 
//         };
//     });

//     btnClose.addEventListener("click", () => {
//         if (winHandle) {
//             winHandle.close();
//         }
//     });
// }



function onLoad() {
    // 객체 찾기
    const btnOpen = document.querySelector("#open");
    const btnClose = document.querySelector("#close");
    const idObj = document.querySelector("#userid");
    const pwd = document.querySelector("#pwd");
    // 팝업창의 윈도우 핸들 변수  
    let winHandle = null;

    // 이벤트 리스너 등록 및 핸들러 처리
    btnOpen.addEventListener("click", () => {
        // Open the popup
        winHandle = window.open("./ex10_1_window_popup.html", "_blank", "width=400, height=400, left=30, top=30");
        
        // Use setInterval to check when the popup is loaded
        const interval = setInterval(() => {
            if (winHandle && winHandle.document.readyState === "complete") {
                // Pass values to the popup when it's ready
                winHandle.document.querySelector("#userid").value = idObj.value;
                winHandle.document.querySelector("#pwd").value = pwd.value;
                clearInterval(interval); // Stop checking
            }
        }, 100);
    });

    btnClose.addEventListener("click", () => {
        if (winHandle) {
            winHandle.close();
        }
    });
}



// // 선생님 버전 
// function onLoad(){
//     //객체찾기
//     const btnopen = document.querySelector("#open");
//     const btnclose = document.querySelector("#close");
//     const idobj = document.querySelector("#userid");
//     const pwd = document.querySelector("#pwd");
//     //팡업윈도우 === window 핸들변수
//     let win = null;  
    
//     //이벤트리스너등록및 핸들러처리
//     btnopen.addEventListener("click",()=>{
//         win = window.open("./ex10_1_window_popup.html","_blank","width=400, height=400, left=100, top=100");
//         setTimeout(()=>{
//             win.document.querySelector("#userid").value = idobj.value; 
//             win.document.querySelector("#pwd").value = pwd.value; 
//         },100); 
         
//     });
//     btnclose.addEventListener("click",()=>{
//         win.close();
//     });
// }

