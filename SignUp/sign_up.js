window.goHome = function(){
  window.location.href = "https://heeouo.github.io/open-daw-melto/index.html";
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwTxtWBivMlvNabmhioqb6993JAWRDtIA",
  authDomain: "easylogin-d55ec.firebaseapp.com",
  projectId: "easylogin-d55ec",
  storageBucket: "easylogin-d55ec.appspot.com",
  messagingSenderId: "1077357344147",
  appId: "1:1077357344147:web:23bfe8236120149936a466",
  measurementId: "G-XXBRVWYQKS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.getElementById('signUpForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const message = document.getElementById('message');

  // 이메일 형식 체크
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    message.style.color = 'red';
    message.textContent = '유효한 이메일 주소를 입력하세요.';
    return;
  }

  // 비밀번호 확인 체크
  if (password !== confirmPassword) {
    message.style.color = 'red';
    message.textContent = '비밀번호가 일치하지 않습니다.';
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = 'login.html'; // 바로 로그인 화면으로 이동
    })
    .catch((error) => {
      message.style.color = 'red';
      message.textContent = '회원가입 실패: ' + error.message;
    });
});