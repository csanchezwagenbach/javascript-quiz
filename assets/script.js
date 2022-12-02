var initialDisplay = document.querySelector("#initial-display");
var questionsDisplay = document.querySelector("#questions-display");
var questionOnDisplay = document.querySelector("#question");
var answerChoicesDisplay = document.querySelector("#answer-list");
var endGameDisplay = document.querySelector("#endgame-display");
var initialsInput = document.querySelector("#user-initials-input");
var submitButton = document.querySelector("#submit-button");
var highScoreDisplay = document.querySelector("#highscore-display");
var highScoreList = document.querySelector("#highscores");
var timerDisplay = document.querySelector("#timer-display");

var answerChoiceOne = document.createElement("li");
var answerChoiceTwo = document.createElement("li");
var answerChoiceThree = document.createElement("li");
var answerChoiceFour = document.createElement("li");
var answerChoiceBank = [answerChoiceOne, answerChoiceTwo, answerChoiceThree, answerChoiceFour];

var userScoreReport = document.createElement("p");

var questionCount = 0;
var timer;
var timerCount = 60;


var questions = [
    {
        questionText: "Which of the following does not represent a primitive type?",
        answerText:["Boolean","Number","Strand", "Undefined"],
        correctAnswer: "Strand"
    },
    {
        questionText:"How many possible states do Boolean values have?",
        answerText:["One","Two","Three", "Four"],
        correctAnswer: "Two"
    },
    {
        questionText: "What does API stand for?",
        answerText: ["Apple Pizza, Ingrid!", "All Purposes Ice", "Application Programming Interface", "Any Price Index"],
        correctAnswer: "Application Programming Interface"
    },
    {
        questionText: "Where is local storage?",
        answerText: ["Around the corner", "Hiding inside your browser!", "Local storage? No such thing", "Here, there, everywhere"],
        correctAnswer: "Hiding inside your browswer!"
    }
]

function setTimer () {
    timer = setInterval(function() {
        timerCount--;
        timerDisplay.textContent = timerCount + " seconds remaining!";

        if(timerCount === 0 || questionCount === questions.length) {
            clearInterval(timer);
        }
    }, 1000);
}

function startQuiz() {
    initialDisplay.classList.remove("start");
    initialDisplay.classList.add("hidden");
    questionsDisplay.classList.remove("hidden");
    setTimer();
    renderQuiz();
}  

function renderQuiz () {
    if (questionCount < questions.length) {
        questionOnDisplay.textContent = questions[questionCount].questionText;
        for (var j = 0; j < answerChoiceBank.length; j++) {
            answerChoiceBank[j].textContent = questions[questionCount].answerText[j];
            answerChoicesDisplay.appendChild(answerChoiceBank[j]);
        }
    }
    else if (questionCount === questions.length || timerCount === 0) {
        endGame();
    }
}

function endGame() {
    questionsDisplay.classList.add("hidden");
    endGameDisplay.classList.remove("hidden");
    endGameDisplay.classList.add("start");
    userScoreReport.textContent = "You scored a " +timerCount +"!";
    endGameDisplay.appendChild(userScoreReport);
}

function recordScore(event) {
    event.preventDefault();   
    userInitials = initialsInput.value;
    var usersScore = {
        initials: userInitials, 
        score: timerCount,
        };
    var highScores = [usersScore];
    console.log(highScores);
    var usersScores = JSON.parse(localStorage.getItem("users scores"));
    if (usersScores === null) {
    var allHighScores = highScores;
    } else {
    allHighScores = highScores.concat(usersScores);
    }
    localStorage.setItem("users scores", JSON.stringify(allHighScores)); 
    endGameDisplay.classList.remove("start");
    endGameDisplay.classList.add("hidden");
    highScoreDisplay.classList.remove("hidden");
    highScoreDisplay.classList.add("start");
    showHighScores();
}

function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("users scores"));
    console.log(highScores);
    function sortScores (a, b) {
        var scoreA = a.score;
        var scoreB = b.score;
        if (scoreA < scoreB) {
            return 1;
        } else if (scoreA > scoreB) {
            return -1;
        } else {
            return 0;
        }
    }
    highScores.sort(sortScores);
    console.log(highScores);
    for (var i = 0; i < highScores.length; i++) {
        var newHighScore = document.createElement("li");
        newHighScore.textContent = highScores[i].initials + " earned a score of " + highScores[i].score;
        highScoreList.appendChild(newHighScore);
    } 
}


function checkAnswer(userAnswer) {
    console.log(timerCount);
    if (userAnswer !== questions[questionCount].correctAnswer || questionCount === questions.length) {
    timerCount = timerCount - 10;
    questionCount++
    renderQuiz();
    } else if (timerCount > 0) {
    questionCount++
    renderQuiz();
    } else if (timer === 0 || questionCount === questions.length) {
        endGame();
    }
}

answerChoicesDisplay.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        checkAnswer(event.target.textContent);
    }
})

submitButton.addEventListener("click", recordScore) 
