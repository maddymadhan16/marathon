// Countdown Timer
const raceDate = new Date("2025-12-15T06:00:00").getTime();
const timerEl = document.createElement("div");
timerEl.id = "countdown";
document.querySelector("#hero").appendChild(timerEl);

function updateTimer() {
  const now = new Date().getTime();
  const distance = raceDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  timerEl.innerHTML = `<p>⏳ Race Starts In: ${days}d ${hours}h ${minutes}m ${seconds}s</p>`;

  if (distance < 0) {
    timerEl.innerHTML = "<p>🎉 The race has started!</p>";
  }
}
setInterval(updateTimer, 1000);
updateTimer();

// Dark Mode Toggle
const darkBtn = document.createElement("button");
darkBtn.textContent = "🌓 Toggle Dark Mode";
darkBtn.style.cssText = "position: fixed; bottom: 20px; right: 20px; padding: 10px;";
document.body.appendChild(darkBtn);

darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Scroll to Top Button
const topBtn = document.createElement("button");
topBtn.textContent = "⬆ Top";
topBtn.id = "topBtn";
topBtn.style.cssText = "display: none; position: fixed; bottom: 70px; right: 20px; padding: 8px;";
document.body.appendChild(topBtn);

window.onscroll = () => {
  topBtn.style.display = window.scrollY > 300 ? "block" : "none";
};

topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Toast-style Message
function showToast(message, success = true) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${success ? "#4caf50" : "#f44336"};
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    z-index: 1000;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Form Validation and Confirmation
document.getElementById("registrationForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const category = document.getElementById("category").value;

  if (!name || !email || !category) {
    showToast("All fields are required!", false);
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showToast("Please enter a valid email address.", false);
    return;
  }

  showToast(`✅ Registered: ${name} (${category})`, true);

  this.reset();
});
