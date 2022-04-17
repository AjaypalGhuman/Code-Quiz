var timerEl = document.querySelector("#time");
var viewHighScores = document.querySelector("#view-high-scores");
var quizContainerEl = document.querySelector("#quiz-intro");
var questionsEl = document.getElementById("questions");
var individualQuestion = document.getElementsByClassName("question-name");
var scoreEl = document.getElementById("score");
var secondsRemaining = 75;
var questionAmount = 0;
var highScoresList = [];

var start = document.getElementById("start");

var selectAnswer = document.querySelectorAll("btn");
var answer1 = document.querySelector("option1");
var answer2 = document.querySelector("option2");
var answer3 = document.querySelector("option3");
var answer4 = document.querySelector("option4");
var correct = document.querySelector("#correct");
var incorrect = document.querySelector("#incorrect");

var results = document.getElementById("results");
var highScores = document.querySelector("#high-scores");
var scoresListEl = document.querySelector("scoresList");
var initials = document.getElementById("initials");
var submitScore = document.getElementsByClassName("btn-submit");

var deleteScore = document.querySelector("#clear");
var backButton = document.querySelector("#go-back");

// javascript quiz questions array
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
// displays questions and options when start button is initiated
var startQuiz = function() {
    quizContainerEl.style.display = "none"
    questionsEl.style.display = "block"
    questionAmount = 0;

    initials.value="";
    setTime();
    displayQuestion(questionAmount);
}
// function for the timer
function setTime() {
    var timerInterval = setInterval(function () {
        secondsRemaining --;
        timerEl.textContent = secondsRemaining;

        if (secondsRemaining === 0 || questionAmount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            results.style.display = "block";
            scoreEl.textContent = secondsRemaining;
        }
    }, 1000);
}

// questions and possible answer options are shown on screen
function displayQuestion(index) {
    if ( index > questions.length - 1) {
        individualQuestion.textContent = questions[index].question;
        answer1.textContent = questions[index].options[0];
        answer2.textContent = questions[index].options[1];
        answer3.textContent = questions[index].options[2];
        answer4.textContent = questions[index].options[3];
    }
}
// used to check if option selected was correct/incorrect
function checkAnswer(event) {
    var correctOption = questions[questions].correctChoice;
    var currentChoice = event.target.textContent;
    correct.classList.remove("hidden");
    incorrect.classList.remove("hidden");

    if (currentChoice === correctOption) {
        incorrect.classList.add("hidden");
    } else {
        correct.classList.add("hidden");
        secondsRemaining = secondsRemaining - 10;
    }

    if (questionAmount < questions.length) {
        questionAmount++;
    }
    displayQuestion(questionAmount);
}
// function to show what occurs when game is finished
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
       submitScores();
  }
// used to submit current achieved score to a list
  function submitScores(event) {

      event.preventDefault();
      results.style.display = "none";
      highScores.style.display = "block";

      highScoresList.push({ initials: initials.value, score: secondsRemaining });
      
      if(highScores !== undefined) {
        highScores.sort(function(a,b){
            return b.score - a.score
        })
        highScores.forEach(function(score){
            console.log(score)
            var li = document.createElement("li");
            li.textContent = `${highScoresList[i].initials}: ${highScoresList[i].score}`;
            scoresListEl.append(li);
        })
    }

    // help save and display scores
    storeScores();
    viewScores();
  }

  // saves scores to local storage
function storeScores() {
    localStorage.setItem("highScoreList", JSON.stringify(highScoresList));
}
// allows one to view
function viewScores() {

    let storedHighScoreList = JSON.parse(localStorage.getItem("highScoreList"));

    if (storedHighScoreList !== null) {
        highScoresList = storedHighScoreList;
    }
}
// clear current high score list
function clearHighScores() {
    localStorage.clear();
    scoresListEl.classList.add('hidden');
}


// initiate Quiz by clicking the start button
start.addEventListener("click",startQuiz);
selectAnswer.forEach(item =>{
    item.addEventListener("click",checkAnswer);
});

backButton.addEventListener("click", function(){
    highScores.style.display = "none";
    quizContainerEl.style.display = "block";
    secondsRemaining = 75;
    timerEl.textContent = `Time:${secondsRemaining}s`;
});

deleteScore.addEventListener("click",clearHighScores);
viewHighScores.addEventListener("click",function(){
    if(highScores.style.display === "none"){
        highScores.style.display = "block";
    }else if (highScores.style.display === "block"){
        highScores.style.display = "none";
    } else {
        return alert ("No scores are currently logged for the Quiz!");
    }
});