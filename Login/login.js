function goHome() {
  window.location.href = "/index.html";
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMessage');

  import('https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js').then(({ initializeApp }) => {
    import('https://www.gstatic.com/firebasejs/11.7.1/firebase-auth.js').then(({ getAuth, signInWithEmailAndPassword }) => {
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

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          localStorage.setItem('isLoggedIn', 'true');
          window.location.href = "https://heeouo.github.io/open-daw-melto/index.html";
        })
        .catch((error) => {
          errorMsg.classList.remove('show'); // html요소에서 show 이름의의 클래스 제거거
          void errorMsg.offsetWidth;         // 레이아웃 재계산
          errorMsg.textContent = "이메일 또는 비밀번호가 잘못되었습니다.";
          errorMsg.classList.add('show');    // re-apply fade-in
        });
    });
  });
});