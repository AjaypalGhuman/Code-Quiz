var timerEl = document.querySelector("#timer");
var viewHighScores = document.querySelector("#view-high-scores");
var quizContainerEl = document.querySelector("#quiz");
var questionsEl = document.getElementById("questions");
var scoreEl = document.getElementById("score");
var secondsRemaining = 75;

var start = document.getElementById("start");
var correct = document.querySelector("correct");
var incorrect = document.querySelector("incorrect");

var start = document.querySelector("#start");
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
        secondsLeft--;
        timerEl.textContent = timeCountdown;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            results.style.display = "block";
            score.textContent = secondsRemaining;
        }
    }, 1000);
}

