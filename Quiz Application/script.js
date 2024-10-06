const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: "Who invented Java Programming?",
    answers: [
      { text: "Guido van Rossum", correct: false },
      { text: "James Gosling", correct: true },
      { text: "Dennis Ritchie", correct: false },
      { text: "Bjarne Stroustrup", correct: false },
    ],
  },
  {
    question: "Which of the following is not a keyword in java?",
    answers: [
      { text: "static", correct: false },
      { text: "void", correct: false },
      { text: "private", correct: false },
      { text: "Boolean", correct: true },
    ],
  },
  {
    question: "What is the return type of the hashCode() method in the Object class?",
    answers: [
      { text: "void", correct: false },
      { text: "object", correct: false },
      { text: "int", correct: true },
      { text: "long", correct: false },
    ],
  },
  {
    question: "An interface with no fields or methods is known as a ______",
    answers: [
      { text: "Runnable Interface", correct: false },
      { text: "Marker Interface", correct: true },
      { text: "Abstract Interface", correct: false },
      { text: "CharSequence Interface", correct: false },
    ],
  },
  {
    question: "In which memory a String is stored, when we create a string using 'new' operator?",
    answers: [
      { text: "Stack", correct: false },
      { text: "String memory", correct: false },
      { text: "Random storage space", correct: false },
      { text: "Heap memory", correct: true },
    ],
  },
];

startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(
    answerButtons.querySelectorAll("input")
  ).findIndex((radio) => radio.checked);
  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }
    currentQuestionIndex++;
    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
