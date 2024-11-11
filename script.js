const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyperlink Text Markup Language", correct: false },
    ],
  },
  {
    question: "What is the purpose of the <!DOCTYPE> declaration in HTML?",
    answers: [
      {
        text: "It defines the document type and version of HTML",
        correct: true,
      },
      { text: "It links to the CSS file", correct: false },
      { text: "It creates a heading for the web page", correct: false },
      { text: "It includes external JavaScript", correct: false },
    ],
  },
  {
    question: "Which property is used to change the font of an element in CSS?",
    answers: [
      { text: "font-weight", correct: false },
      { text: "font-style", correct: false },
      { text: "font-family", correct: true },
      { text: "font-size", correct: false },
    ],
  },
  {
    question:
      "Which HTML attribute specifies an alternative text for an image?",
    answers: [
      { text: "title", correct: false },
      { text: "src", correct: false },
      { text: "alt", correct: true },
      { text: "href", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the text color?",
    answers: [
      { text: "color", correct: true },
      { text: "font-color", correct: false },
      { text: "text-color", correct: false },
      { text: "background-color", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

// Fisher-Yates Shuffle function to shuffle arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start the quiz and shuffle questions
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.style.display = "none";
  shuffleArray(questions); // Shuffle the questions array
  showQuestion();
}

// Show question with shuffled answer options
function showQuestion() {
  answerButton.innerHTML = ""; // Clear previous answers

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = `${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }`;

  // Shuffle the answer options for each question
  shuffleArray(currentQuestion.answers);

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");

    // Event listener for selecting answer
    button.addEventListener("click", () =>
      selectAnswer(button, answer.correct)
    );
    answerButton.appendChild(button);
  });
}

// Handle answer selection and apply color feedback
function selectAnswer(button, isCorrect) {
  if (isCorrect) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "red";
  }

  // Disable all answer buttons after selection
  Array.from(answerButton.children).forEach((btn) => {
    btn.disabled = true;
  });

  // Move to the next question after a short delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }, 1000); // 1 second delay
}

// Show the final score at the end of the quiz
function showScore() {
  const percentageScore = Math.round((score / questions.length) * 100);
  questionElement.innerHTML = `You scored ${score} out of ${questions.length} (${percentageScore}%)`;
  answerButton.innerHTML = ""; // Clear the answer buttons
  nextButton.style.display = "none"; // Hide the next button
}

// Start the quiz
startQuiz();
