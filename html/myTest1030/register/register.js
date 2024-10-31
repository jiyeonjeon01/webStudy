function onLoad() {
    // 화면 객체 가져온다.
    let slideshow = document.querySelector(".slideShow");
    let slidePic = document.querySelector(".slidePic");
    let picArr = document.querySelectorAll(".slidePic a");
    let prev = document.querySelector(".prev");
    let next = document.querySelector(".next");
    let slideFooterIcon = document.querySelectorAll(".slideFooterIcon a");

    // 현재 이미지 인덱스, 인터벌 아이디, 슬라이드 개수
    let currentIndex = 0; 
    let timerID = null; 
    let slideCount = picArr.length;

    // 현재 이미지를 한 줄로 정렬한다.
    function initSlides() {
        for (let i=0; i<slideCount; i++) {
            picArr[i].style.left = `${i * 100}%`;
        }
        gotoslide(currentIndex); // 초기 슬라이드 설정
    }

    // 화면 전환 해주는 함수
    function gotoslide(index) {
        // 현재 인덱스를 업데이트합니다.
        currentIndex = index;

        // 슬라이드를 왼쪽으로 이동합니다.
        let newLeft = `${index * -100}%`;
        slidePic.style.transform = `translateX(${newLeft})`;

        // indicator 그 위치를 가리켜줘야 한다. 
        slideFooterIcon.forEach((icon, i) => {
            icon.classList.toggle('active', i === index);
        });
    }

    // 3초마다 gotoslide() 불러주자. 
    function startTimer() {
        timerID = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount; // 다음 슬라이드로 이동
            gotoslide(currentIndex);
        }, 1000); // 3초 간격으로 변경
    }

    initSlides(); // 슬라이드 초기화
    startTimer(); // 타이머 시작

    // 이벤트 등록 핸들러 기능
    function stopTimer() {
        clearInterval(timerID);
    }

    function resumeTimer() {
        startTimer();
    }

    // 마우스 이벤트 처리
    slidePic.addEventListener("mouseenter", stopTimer);
    slidePic.addEventListener("mouseleave", resumeTimer);
    prev.addEventListener("mouseenter", stopTimer);
    prev.addEventListener("mouseleave", resumeTimer);
    next.addEventListener("mouseenter", stopTimer);
    next.addEventListener("mouseleave", resumeTimer);
    
    // 이전 슬라이드 버튼 클릭 시
    prev.addEventListener("click", (event) => {
        event.preventDefault();
        currentIndex = (currentIndex - 1 + slideCount) % slideCount; // 이전 슬라이드로 이동
        gotoslide(currentIndex);
    });

    // 다음 슬라이드 버튼 클릭 시
    next.addEventListener("click", (event) => {
        event.preventDefault();
        currentIndex = (currentIndex + 1) % slideCount; // 다음 슬라이드로 이동
        gotoslide(currentIndex);
    });

    // 슬라이드 인디케이터 클릭 시
    slideFooterIcon.forEach((icon, index) => {
        icon.addEventListener("mouseenter", stopTimer);
        icon.addEventListener("mouseleave", resumeTimer);
        icon.addEventListener("click", (event) => {
            event.preventDefault();
            gotoslide(index); // 해당 인덱스로 이동
        });
    });

    initSlides(); // 슬라이드 초기화
}
        
   
   // 이게 싫으면 zIndex로 주면 됨 
   // 지금거는 옆으로 100% 200% 300% 400% 를 차지하고잇는 사진을 100%씩 왼쪽으로 미는 방식 
   