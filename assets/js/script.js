var timerEl = document.querySelector("#timer");
var viewHighScores = document.querySelector("#view-high-scores");
var quizContainerEl = document.querySelector("#quiz");
var questionsEl = document.getElementById("questions");
var scoreEl = document.getElementById("score");
var secondsRemaining = 75;

var start = document.getElementById("start");
var correct = document.querySelector("correct");
var incorrect = document.querySelector("incorrect");

var answer1 = document.getElementById("option1");
var answer2 = document.getElementById("option2");
var answer3 = document.getElementById("option3");
var answer4 = document.getElementById("option4");

var results = document.getElementById("results");
var scoreEl = document.getElementById("score");
var highScores = document.querySelector("#high-scores");
var highScoresList = document.querySelector("highScoresList");
var initialsEl = document.getElementById("initials");
var submitScore = document.querySelector("btn-submit");

var deleteScore = document.querySelector("#clear");
var backButton = document.querySelector("#go-back");
var correct = document.getElementById('correct');
var incorrect = document.getElementById('incorrect');

var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        options: ["A. strings", "B. booleans", "C. alerts", "D. numbers"],
        correctChoice: "B"
    },
    {
        question: "The condition in an if/else statement is enclosed with ____.",
        options: ["A. quotes", "B. curly brackets", "C. parenthesis", "D. square brackets"],
        correctChoice: "B"
    },
    {
        question: "Arrays in Javascript can be used to store ___.",
        options: ["A. numbers and strings", "B. other arrays", "C. booleans", "D. all of the above"],
        correctChoice: "C"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        options: ["A. commas", "B. curly brackets", "C. quotes", "D. parenthesis"],
        correctChoice: "B"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["A. Javascript", "B. terminal/bash", "C. for loops", "D. console.log"],
        correctChoice: "C"
    }
];

function setTime() {
    var timerInterval = setInterval(function () {
        secondsRemaining--;
        timerEl.textContent = secondsRemaining;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            results.style.display = "block";
            score.textContent = secondsRemaining;
        }
    }, 1000);
}

var startQuiz = function() {
    quizContainerEl.style.display = "none"
    questionsEl.style.display = "block"
    questionCount = 0;

    setTime();
    displayQuestion(questionCount);
}

function displayQuestion(questionId) {
    if (questionId < questions.length) {
        questionsEl.textContent = questions[questionId].question;
        answer1.textContent = questions[questionId].options[0];
        answer2.textContent = questions[questionId].options[1];
        answer3.textContent = questions[questionId].options[2];
        answer4.textContent = questions[questionId].options[3];
    }
}

var checkAnswer = function(event) {
    var correctChoice = questions[questionId].correctChoice
    var currentChoice = event.target.textContent
    correct.classList.remove("hidden")
    incorrect.classList.remove("hidden")

    if (currentChoice === correctChoice) {
        incorrect.classList.add("hidden")
    } else {
        correct.classList.add("hidden")
        secondsRemaining = secondsRemaining - 10;
    }

    if (questionCount < questions.length) {
        questionCount ++;
    }
    displayQuestion(questionCount);
}

var gameOver = function(){
    clearInterval(timerInterval);
    quizContainerEl.classList.add('hidden')
       results.classList.remove('hidden')
       scoreEl.textContent = "You scored: " + secondsRemaining;
       timerEl.classList.add('hidden')

       setTimeout(function() {
           correct.setAttribute("class", "hidden");
       }, 1000);
       setTimeout(function() {
           incorrect.setAttribute("class", "hidden");
       }, 1000);
       submitScore();
  }

  function submitScore(event) {

      event.preventDefault();
      results.style.display = "none";
      highScores.style.display = "block";

      highScoresList.push({ initials: initialsEl.value, score: secondsRemaining });
      
      if(highScores !== undefined) {
        highScores.sort(function(a,b){
            return b.score - a.score
        })
        highScores.forEach(function(score){
            console.log(score)
            var li = document.createElement("li");
            li.textContent = `${highScoresList[i].initials}: ${highScoresList[i].score}`;
            highScoresListEl.append(li);
        })
    }

    // help save and display scores
    storeScores();
    viewScores();
  }

function storeScores() {
    localStorage.setItem("highScoreList", JSON.stringify(highScoresList));
}

function viewScores() {

    let storedHighScoreList = JSON.parse(localStorage.getItem("highScoreList"));

    if (storedHighScoreList !== null) {
        highScoresList = storedHighScoreList;
    }
}

function clearHighScores() {
    localStorage.clear();
    highScoresList.classList.add('hidden');
}


document.getElementById("clear").onclick = clearHighScores;
start.addEventListener('click', startQuiz)
option1.addEventListener("click", checkAnswer)
option2.addEventListener("click", checkAnswer)
option3.addEventListener("click", checkAnswer)
option4.addEventListener("click", checkAnswer)
highScoresList.addEventListener("click", viewHighScores)