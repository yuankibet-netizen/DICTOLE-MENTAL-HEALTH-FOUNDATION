// 🔥 Confirm JS is loading
console.log("auth.js loaded ✅");

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBW0U-4HEP09MNa0uIW88WRGCukRdU8VJw",
  authDomain: "dictole.firebaseapp.com",
  projectId: "dictole",
  storageBucket: "dictole.firebasestorage.app",
  messagingSenderId: "799022333545",
  appId: "1:799022333545:web:4901960af2470d60076cf8"
};

// 🔹 Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 🔹 Google provider with additional scopes
const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

// 🔹 ELEMENTS
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const formTitle = document.getElementById("formTitle");

// 🔹 TOGGLE LOGIN / REGISTER
showRegister.onclick = () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
  formTitle.innerText = "Create Account";
};

showLogin.onclick = () => {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
  formTitle.innerText = "Login";
};

// 🔹 REGISTER USER
document.getElementById("registerBtn").onclick = () => {
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value.trim();

  if (!email || !password) {
    alert("⚠️ Enter email and password");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(err => alert("❌ " + err.message));
};

// 🔹 LOGIN USER
document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("⚠️ Enter email and password");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch(err => alert("❌ " + err.message));
};

// 🔹 GOOGLE LOGIN
document.getElementById("googleBtn").onclick = () => {
  console.log("Google sign-in clicked");

  auth.signInWithPopup(googleProvider)
    .then((result) => {
      console.log("Google sign-in successful", result.user);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Google sign-in error:", error);
      alert("❌ Google sign-in failed: " + error.message);
    });
};

// 🔹 Check auth state
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is signed in:", user.email);
  } else {
    console.log("User is signed out");
  }
});
