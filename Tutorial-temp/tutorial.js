document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addInstrumentBtn");
    const options = document.getElementById("instrumentOptions");
    const closeBtn = document.getElementById("closeOptions");
    const trackArea = document.getElementById("trackArea");
    trackArea.style.display = "block";
    

    addBtn.addEventListener("click", () => {
        options.classList.toggle("hidden");
    });

    closeBtn.addEventListener("click", () => {
        options.classList.add("hidden");
    });

    document.querySelectorAll(".instrument").forEach(button => {
        button.addEventListener("click", () => {
            const instrument = button.dataset.instrument;
            addTrack(instrument);
            options.classList.add("hidden");
        });
    });

    function addTrack(instrument) {
        const track = document.createElement("div");
        track.classList.add("track");
        track.textContent = `${instrument} 트랙`;
        trackArea.appendChild(track);
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const steps = [
        {
            message: "1️. 악기 추가 버튼을 클릭하세요.",
            targetId: "addInstrument",
            event: "click"
        },
        {
            message: "2️. 녹음 버튼을 클릭하세요.",
            targetId: "record",
            event: "click"
        },
        {
            message: "3️. 피아노 키 아무거나 클릭해보세요.",
            targetId: "pianoKeys",
            event: "click"
        },
        {
            message: "4️. 정지 버튼을 클릭하세요.",
            targetId: "stop",
            event: "click"
        },
        {
            message: "5️. 재생 버튼을 클릭하세요.",
            targetId: "play",
            event: "click"
        },
        {
            message: "6️. 저장 버튼을 클릭하세요.",
            targetId: "save",
            event: "click"
        },
        {
            message: "🎉 튜토리얼 완료! 이제 자유롭게 사용해보세요.",
            targetId: null,
            event: null
        }
    ];

    let currentStep = 0; /* 현재 튜토리얼 단계 */
    const overlay = document.getElementById("tutorialOverlay"); /* 튜토리얼 메시지 띄우는 박스 div */
    overlay.style.display = "block"; /* display 속성은 요소가 보여지는 모습 설정 가능 */
    const message = document.getElementById("tutorialMessage");
    const startBtn = document.getElementById("startTutorial");

    startBtn.addEventListener("click", () => {
        startBtn.style.display = "none"; /* 버튼 숨기기 */
        runStep(); /* 튜토리얼 단계 진입 */
    });

    function runStep() {
        if (currentStep >= steps.length) { 
            overlay.style.display = "none";
            return;
        }

        const step = steps[currentStep]; /* 현재 나와야 하는 튜토리얼 정보 요소 하나를 넘겨줌 */
        message.textContent = step.message; /* textContent 속성은 html 요소의 텍스트 콘텐츠 가져옴 */
        overlay.style.display = "block";

        if (step.targetId) {
            const target = document.getElementById(step.targetId);
            target.classList.add("highlight"); /* 강조 표시 추가 */

            const handler = () => { /* 함수 선언 방식, 하이라이트 제거 함수 */
                target.classList.remove("highlight");
                target.removeEventListener(step.event, handler);
                currentStep++;
                runStep();
            };

            if (step.targetId === "pianoKeys") {
                target.querySelectorAll(".key").forEach(key => {  /* css 선택자  .key로 모두 가져옴(리스트), 각각 함수 인자로 주고 이벤트 리스너 추가 */
                    /* forEach로 key 버튼들을 순차 처리함 */
                    key.addEventListener(step.event, handler, { once: true }); /* 한 번만 발생 */
                });
            } else {
                target.addEventListener(step.event, handler, { once: true });
            }
        } else { /* 마지막 단계인 경우 */
            const finishBtn = document.createElement("button");
            finishBtn.textContent = "튜토리얼 종료";
            finishBtn.addEventListener("click", () => {
                overlay.style.display = "none";
            });
            overlay.appendChild(finishBtn);
        }
    }
});

