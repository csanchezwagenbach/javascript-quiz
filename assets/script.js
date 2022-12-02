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
var returnButton = document.querySelector("#return-button");
var clearButton = document.querySelector("#clear-button");
var viewHighScoresButton = document.querySelector("#view-highscore")
var startButton = document.querySelector("#start-button");

//I began by calling references to every HTML element that both I and the user would be interacting with throughout the application. As I worked through building this, the list continually got longer, and the above is the list of HTML elements engaged with throughout.

//Here I dynamically created li elements and stored them to the answerChoice variables. I then put the empty li's into an array with the intention of populating them later with an answerText property.

var answerChoiceOne = document.createElement("li");
var answerChoiceTwo = document.createElement("li");
var answerChoiceThree = document.createElement("li");
var answerChoiceFour = document.createElement("li");
var answerChoiceBank = [answerChoiceOne, answerChoiceTwo, answerChoiceThree, answerChoiceFour];

//This dynamically created p element will report the users score to them upon finishing the quiz

var userScoreReport = document.createElement("p");

//questionCount will serve as the index that regulates which question is to be displayed throughout the application. Later, a click event on an answer choice will trigger questionCount to increment by 1, bringing up the next question display.

//timer serves as the variable that will hold the setInterval function. timerCount initializes the timer at 60 seconds.

var questionCount = 0;
var timer;
var timerCount = 60;

//Below is an array of objects, where each object has a property that holds a questions text, the text belonging to each of its answer choices, as well as the text of the correct answer

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
        correctAnswer: "Hiding inside your browser!"
    }
]

//Sets the timer for the quiz. It will decrement by one every 1000 milliseconds, and if the timer hits 0 our questionCount index reaches the length of the questions array, the clock will stop.

function setTimer () {
    timer = setInterval(function() {
        timerCount--;
        timerDisplay.textContent = timerCount + " seconds remaining!";

        if(timerCount <= 0 || questionCount === questions.length) {
            clearInterval(timer);
        }
    }, 1000);
}

//This function removes the initial display and presents the user with the first question. The function is triggered upon a click event on the start quiz button on the load screen.

function startQuiz() {
    initialDisplay.classList.remove("start");
    initialDisplay.classList.add("hidden");
    questionsDisplay.classList.remove("hidden");
    setTimer();
    renderQuiz();
}  

//This function serves to regulate which question and which answer choices are displayed. As questionCount increments, the referenced object in the questions array will increment. The text displayed dynamically updates upon questionCounts incrementation. Additionally, answerChoiceBank is populated using a for loop the length of its index to map answertexts from the question[questionCount]'s property. When questionCount reaches the length of the questions array, endGame is triggered.

function renderQuiz () {
    if (questionCount < questions.length) {
        questionOnDisplay.textContent = questions[questionCount].questionText;
        for (var j = 0; j < answerChoiceBank.length; j++) {
            answerChoiceBank[j].textContent = questions[questionCount].answerText[j];
            answerChoiceBank[j].classList.add("answer-choice");
            answerChoicesDisplay.appendChild(answerChoiceBank[j]);
        }
    }
    else if (questionCount === questions.length || timerCount === 0) {
        endGame();
    }
}

//endGame removes the questionDisplay, generates the endGame display and appends the users score. endGame display offers players the chance to enter their initials to be stored to a high score menu.

function endGame() {
    questionsDisplay.classList.add("hidden");
    endGameDisplay.classList.remove("hidden");
    endGameDisplay.classList.add("start");
    userScoreReport.textContent = "You scored a " +timerCount +"!";
    endGameDisplay.appendChild(userScoreReport);
}

//recordScore adds the users score to an array of objects in local storage. This array holds objects with properties of initials and score, which holds previous users initials and scores. Current users information is stored in an object, local storage is retrieved, and the object is pushed into the array before the array itself is pushed back into local storage.

function recordScore(event) {
    event.preventDefault();   
    userInitials = initialsInput.value;
    var usersScore = {
        initials: userInitials, 
        score: timerCount,
        };
    var highScores = [usersScore];
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

//showHighScores pulls the array of objects out of local storage, sorts the objects by comparing the values of their "score" property, resets the high score menu, then populates the waiting ol with the reorganized array presented as an indexed list, highest scores on top, lowest on the bottom.

function showHighScores() {
    var highScores = JSON.parse(localStorage.getItem("users scores"));
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
    highScoreList.innerHTML = "";
    for (var i = 0; i < highScores.length; i++) {
        var newHighScore = document.createElement("li");
        newHighScore.textContent = highScores[i].initials + " earned a score of " + highScores[i].score;
        highScoreList.appendChild(newHighScore);
    } 
}

//The function below runs upon a click event on any of the answer choices a user is displayed throughout the quiz. This function checks the target of the users click and compares the string held in that li with the string held in the "correctAnswer" property. If the question does not match, ten seconds are decremented and questionCount increments. If they do match, questionCount increments. If there are no more questions or the timer hits 0, endGame is triggered. renderQuiz runs in the former two situations, and with questionCount having incremented, renderQuiz generates a new question and a new set of answer choices. 

function checkAnswer(userAnswer) {
    if (userAnswer !== questions[questionCount].correctAnswer && questionCount <= questions.length) {
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

//Listens for click event on the start button when page loads.

startButton.addEventListener("click", startQuiz);

//Listens for click event on each of the answer choices during the quiz.

answerChoicesDisplay.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        checkAnswer(event.target.textContent);
    }
})

//Listens for a click event on the submit button on endGame screen that allows user to share their initials

submitButton.addEventListener("click", recordScore) 

//Listens for a click event on the return button on highScoresDisplay. Resets the timer and sends user back to load page.

returnButton.addEventListener("click", function() {
    highScoreDisplay.classList.remove("start");
    highScoreDisplay.classList.add("hidden");
    initialDisplay.classList.remove("hidden");
    initialDisplay.classList.add("start");
    timerCount = 60;
    questionCount = 0;
})

//Listens for click event on clear highscores button. Clears out local storage and reloads the page, sending user to start of quiz.

clearButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
})

//Listens for click on viewHighScoresButton that resets displays and generates highScoreDisplay for user to view high scores list

viewHighScoresButton.addEventListener("click", function() {
    initialDisplay.classList.remove("start");
    questionsDisplay.classList.remove("start");
    endGameDisplay.classList.remove("start");
    initialDisplay.classList.add("hidden");
    questionsDisplay.classList.add("hidden");
    endGameDisplay.classList.add("hidden");
    highScoreDisplay.classList.add("start");
})
