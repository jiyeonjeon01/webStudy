// 객체를 가져온다. 
let div_box = window.document.getElementById("box");
let position = 0;

function moveBox(){
    if(position < 200){
        position += 1;
        div_box.style.left = position + "px";
    }else{
        position = 0;
        div_box.style.left = position + "px";
    }
     // 계속해서 moveBox() 불러주는 콜백 기능을 부여한다. 
     window.requestAnimationFrame(moveBox)
}

moveBox();
