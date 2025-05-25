let tutorialStep = 0;
let track = [];
let isRecording = false;
let played = false;
let recordingStarted = false;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode") || "basic";
  document.getElementById("modeLabel").textContent = "[모드: " + mode + "]";
  if (mode === "tutorial") {
    updateTutorialGuide();
    setInterval(checkTutorialStep, 1000);
  }
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  const instrument = document.getElementById("instrument").value;
  if (!['a', 's', 'd', 'f', 'g', 'h', 'j'].includes(key)) return;

  playSound(instrument, key);

  if (isRecording) {
    track.push({ time: Date.now(), key, instrument });
    updateTrackDisplay();
  }

  if (tutorialStep === 1) played = true;
  if (tutorialStep === 3) played = true;
});

function playSound(instrument, key) {
  const audio = new Audio(`sounds/${instrument}-${key}.mp3`);
  audio.play();
}

function startRecording() {
  isRecording = true;
  recordingStarted = true;
  track.length = 0;
  alert("녹음을 시작합니다!");
}

function stopRecording() {
  isRecording = false;
  alert("녹음을 멈췄습니다.");
}

function playTrack() {
  if (track.length === 0) return alert("녹음된 트랙이 없습니다.");
  let startTime = track[0].time;
  track.forEach(note => {
    setTimeout(() => {
      playSound(note.instrument, note.key);
    }, note.time - startTime);
  });
}

function rewind() {
  alert("처음으로 돌아갑니다.");
}

function saveTrack() {
  const blob = new Blob([JSON.stringify(track)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "melto-track.json";
  a.click();
}

function updateTrackDisplay() {
  const ul = document.getElementById("trackDisplay");
  ul.innerHTML = '';
  track.forEach(note => {
    const li = document.createElement("li");
    li.textContent = `${note.instrument} - ${note.key}`;
    ul.appendChild(li);
  });
}

function updateTutorialGuide() {
  const messages = [
    "1단계: 피아노를 선택해보세요!",
    "2단계: A 키를 눌러 피아노를 연주해보세요!",
    "3단계: [녹음 시작] 버튼을 눌러 녹음을 시작해보세요!",
    "4단계: 키보드를 눌러 연주를 녹음해보세요!",
    "5단계: [멈춤] 버튼을 눌러 녹음을 종료하세요!",
    "6단계: [재생] 버튼을 눌러 녹음한 음악을 들어보세요!",
    "7단계: [저장] 버튼을 눌러 파일로 저장하세요!",
    "튜토리얼 완료! 자유롭게 음악을 만들어보세요."
  ];
  document.getElementById("tutorialBox").textContent = messages[tutorialStep] || "";
}

function checkTutorialStep() {
  switch (tutorialStep) {
    case 0:
      if (document.getElementById("instrument").value === "piano") tutorialStep++;
      break;
    case 1:
      if (played) tutorialStep++;
      break;
    case 2:
      if (recordingStarted) tutorialStep++;
      break;
    case 3:
      if (track.length > 0) tutorialStep++;
      break;
    case 4:
      if (!isRecording) tutorialStep++;
      break;
    case 5:
      tutorialStep++;
      break;
    case 6:
      tutorialStep++;
      break;
    default:
      return;
  }
  updateTutorialGuide();
}

function confirmNavigation() {
  document.getElementById("confirmModal").style.display = "block";
}

function closeModal() {
  document.getElementById("confirmModal").style.display = "none";
}

function navigateHome() {
  window.location.href = "/index.html";
}