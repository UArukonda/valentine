const cards = document.querySelectorAll(".card");
const homeBtn = document.querySelector(".home-btn");
let current = 0;

// initial state
cards.forEach((card, index) => {
  if (index === 0) {
    card.classList.add("active");
    card.style.opacity = "1";
  } else {
    card.style.opacity = "0";
  }
});

// tap anywhere ONLY for first card
document.body.addEventListener("click", () => {
  if (current !== 0) return;
  fadeToCard(1);
});

// next buttons
document.querySelectorAll(".next-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (current < cards.length - 1) {
      fadeToCard(current + 1);
    }
  });
});

// prev buttons (disable on question card)
document.querySelectorAll(".prev-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // NO button on question card should NOT go back
    if (btn.closest(".question-card")) return;

    if (current > 0) {
      fadeToCard(current - 1);
    }
  });
});

// home button
homeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fadeToCard(0);
});

function fadeToCard(index) {
  if (index === current) return;

  cards[current].classList.remove("active");
  cards[current].style.opacity = "0";

  current = index;

  cards[current].classList.add("active");
  cards[current].style.opacity = "1";
}

//-------------------------------------------------------

// const form = document.getElementById("answer-form");
// const input = document.getElementById("answer-input");

// document
//   .querySelector(".question-card .next-btn")
//   .addEventListener("click", () => {
//     input.value = "Yes";
//     submitAnswer();
//   });

// document
//   .querySelector(".question-card .prev-btn")
//   .addEventListener("click", () => {
//     input.value = "No";
//     submitAnswer();
//   });

// function submitAnswer() {
//   fetch("https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse", {
//     method: "POST",
//     mode: "no-cors",
//     body: new FormData(form),
//   });
// }

//-------------------------------------------------

const yesBtn = document.querySelector(".question-card .next-btn");
const noBtn = document.querySelector(".question-card .prev-btn");

let scale = 1;

noBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  scale += 0.02;
  yesBtn.style.transform = `scale(${scale})`;
});

// ONLY move forward when YES is clicked
yesBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  // your existing YES logic stays (submit + next card)
});

// ----------------------------------

const form = document.getElementById("answer-form");
const input = document.getElementById("answer-input");

// YES buttons
document.querySelectorAll(".question-card .next-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    input.value = `Yes - Question ${index + 1}`;
    form.submit();
  });
});

// NO buttons
document.querySelectorAll(".question-card .prev-btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    input.value = `No - Question ${index + 1}`;
    form.submit();
  });
});
