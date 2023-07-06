**You:**

Could you help me code a timed-quiz?

------------------

**ChatGPT:**

Certainly! I can help you with coding a timed quiz in JavaScript. Here's an example implementation using HTML, CSS, and JavaScript:
HTML:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Timed Quiz</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <div id="quiz-container">
    <h1>Timed Quiz</h1>
    <p id="question"></p>
    <div id="options-container">
      <button class="option"></button>
      <button class="option"></button>
      <button class="option"></button>
      <button class="option"></button>
    </div>
    <div id="result"></div>
    <div id="timer">Time: <span id="time-left"></span></div>
    <button id="start-btn">Start Quiz</button>
  </div>

  <script src="script.js"></script>
</body>
</html>

```
CSS (styles.css):
```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
}

#quiz-container {
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
}

#question {
  font-size: 18px;
  margin-bottom: 20px;
}

#options-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.option {
  width: 200px;
  padding: 10px;
  margin-bottom: 10px;
}

#result {
  font-weight: bold;
  margin-bottom: 20px;
}

#timer {
  font-size: 16px;
  margin-bottom: 20px;
}

#start-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
}

```
JavaScript (script.js):
```javascript
var quizData = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Madrid"],
    answer: 0
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: 0
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Mars", "Saturn", "Earth"],
    answer: 0
  }
];

var questionIndex = 0;
var timer;
var timeLeft = 10; // Change this to set the quiz duration (in seconds)

var questionElement = document.getElementById("question");
var optionsContainer = document.getElementById("options-container");
var resultElement = document.getElementById("result");
var timeLeftElement = document.getElementById("time-left");
var startButton = document.getElementById("start-btn");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  displayQuestion();
  startTimer();
}

function displayQuestion() {
  var currentQuestion = quizData[questionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach(function(option, index) {
    var button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;
    button.addEventListener("click", checkAnswer.bind(null, index));
    optionsContainer.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  var currentQuestion = quizData[questionIndex];
  if (selectedIndex === currentQuestion.answer) {
    resultElement.textContent = "Correct!";
  } else {
    resultElement.textContent = "Wrong!";
  }

  questionIndex++;
  if (questionIndex < quizData.length) {
    setTimeout(displayQuestion, 1000);
  } else {
    endQuiz();
  }
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timeLeftElement.textContent = timeLeft;

  if (timeLeft === 0) {
    clearInterval(timer);
    endQuiz();
  }
}

function endQuiz() {
  questionElement.textContent = "Quiz complete!";
  optionsContainer.innerHTML = "";
  resultElement.textContent = "Your quiz has ended.";
}

```
This example creates a simple timed quiz with three multiple-choice questions. You can customize the questions, options, and duration by modifying the `quizData` array and the `timeLeft` variable in the JavaScript code.
The quiz starts when the "Start Quiz" button is clicked. Each question is displayed with its options, and the user can select an option by clicking on the corresponding button. After answering a question, the result is displayed (correct or wrong), and the next question is shown after a one-second delay. The timer keeps track of the remaining time, and when it reaches zero, the quiz ends.
Feel free to customize the HTML, CSS, and JavaScript code to meet your specific requirements or add more features to the quiz.


------------------

