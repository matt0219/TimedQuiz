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
  var timeLeft = 30; 
  var score = 0;
  
  var questionElement = document.getElementById("question");
  var optionsContainer = document.getElementById("options-container");
  var resultElement = document.getElementById("result");
  var timeLeftElement = document.getElementById("time-left");
  var startButton = document.getElementById("start-btn");
  var saveScoreContainer = document.getElementById("save-score-container");
  var initialsInput = document.getElementById("initials");
  var saveScoreButton = document.getElementById("save-score-btn");
  var finalScoreElement = document.getElementById("final-score");
  
  startButton.addEventListener("click", startQuiz);
  saveScoreButton.addEventListener("click", saveScore);
  
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
      score++;
    } else {
      resultElement.textContent = "Wrong!";
      timeLeft -= 5;
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
  
    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }
  
  function endQuiz() {
    questionElement.textContent = "Quiz complete!";
    optionsContainer.innerHTML = "";
    resultElement.textContent = "Your quiz has ended.";
    saveScoreContainer.style.display = "block";
    finalScoreElement.textContent = "Final Score: " + score;
  }

  function saveScore() {
    var initialsInput = document.getElementById("initials");
    var initials = initialsInput.value.trim();
    if (initials !== "") {
      var savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
      savedScores.push({initials: initials, score: score });
      localStorage.setItem("quizScores", JSON.stringify(savedScores));
      initialsInput.value = "";
      showSavedScores();
    }
  }

  function showSavedScores() {
    var savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
    var scoresContainer = document.getElementById("saved-scores-container");
    scoresContainer.innerHTML = "";

    savedScores.forEach(function (scoreObj) {
      var scoreItem = document.createElement("div");
      scoreItem.textContent = scoreObj.initials + ": " + scoreObj.score;
      scoresContainer.appendChild(scoreItem);
    });
  }