import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBr5unLZvLT85gI5HMqojdq_GcC06yaxOM",
  authDomain: "wilson-5b6f3.firebaseapp.com",
  projectId: "wilson-5b6f3",
  storageBucket: "wilson-5b6f3.firebasestorage.app",
  messagingSenderId: "633592872861",
  appId: "1:633592872861:web:064b49de8bff4695eab974"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// ===============================
// WAIT FOR DOM TO LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // OPEN BUTTON
  document.getElementById("open-btn").addEventListener("click", () => {
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("party-screen").classList.remove("hidden");
    document.getElementById("floating-msg").classList.remove("hidden");

    document.querySelectorAll(".corner-cat").forEach(cat => {
    cat.classList.remove("hidden");
    });


    const video = document.getElementById("birthday-video");
    video.play();

    document.body.classList.add("flash");
    document.body.classList.add("shake");

    setTimeout(() => {
    document.body.classList.remove("flash");
    document.body.classList.remove("shake");
    }, 500);

    confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 }
    });

    // Continuous fireworks
    setInterval(() => {
    confetti({
    particleCount: 80,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() * 0.6
    }
    });
    }, 2000);

   




    startCounter();
    logVisit();
  });

  // Button Listeners
 

  document.getElementById("floating-msg")
    .addEventListener("click", openMessage);

  document.getElementById("message-close")
    .addEventListener("click", closeMessage);

});

//counterrrrrrrr

function startCounter() {
  const birthDate = new Date("2006-02-13T00:00:00");

  setInterval(() => {
    const now = new Date();
    const diff = now - birthDate;

    const seconds = Math.floor(diff / 1000);

    document.getElementById("counter").innerHTML = `
      <div class="survival-box">
        <span class="survival-text">
          Congratulations on surviving —
          <span class="seconds-number">
            ${seconds.toLocaleString()}
          </span>
          seconds
        </span>
      </div>
    `;
  }, 1000);
}






// ===============================
// MODALS
// ===============================


function openMessage() {
  document.getElementById("message-box").classList.remove("hidden");
}

function closeMessage() {
  document.getElementById("message-box").classList.add("hidden");
}


// ===============================
// FIREBASE FUNCTIONS
// ===============================


async function logVisit() {
  await addDoc(collection(db, "visits"), {
    time: new Date()
  });
}
