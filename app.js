const quoteDisplay = document.querySelector("#quoteDisplay");
const inputText = document.querySelector("#inputText");
const counter = document.querySelector("#counter");

const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";

inputText.addEventListener("input", Check);

function Check(e) {
  let correct = true;
  let spanAttributes = document.querySelectorAll("span");
  const arrayValue = inputText.value.split("");
  spanAttributes.forEach((element, index) => {
    if (arrayValue[index] == null) {
      element.classList.remove("correct");
      element.classList.remove("wrong");
      correct = false;
    } else if (arrayValue[index] === element.innerText) {
      element.classList.add("correct");
      element.classList.remove("wrong");
    } else {
      element.classList.add("wrong");
      element.classList.remove("correct");
      correct = false;
    }
  });

  if (correct) {
    renderNewQuote();
  }
}

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  let quote = await getRandomQuote();
  quoteDisplay.innerHTML = "";
  let quoteArray = quote.split("");
  quoteArray.forEach((char) => {
    let spanAttribute = document.createElement("span");
    spanAttribute.innerText = char;
    quoteDisplay.appendChild(spanAttribute);
  });
  inputText.value = "";
  startTimer();
}

let startTime;
function startTimer() {
  counter.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    counter.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

renderNewQuote();
