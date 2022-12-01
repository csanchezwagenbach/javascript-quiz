var initialDisplay = document.querySelector("#initial-display");
var questionsDisplay = document.querySelector("#questions-display");
var questionOnDisplay = document.querySelector("#question");
var answerChoicesDisplay = document.querySelector("#answer-list");
var answerChoices = document.querySelectorAll("li");


var answerChoiceOne = document.createElement("li");
var answerChoiceTwo = document.createElement("li");
var answerChoiceThree = document.createElement("li");
var answerChoiceFour = document.createElement("li");
var answerChoiceBank = [answerChoiceOne, answerChoiceTwo, answerChoiceThree, answerChoiceFour];

var questionCount = 0;
var timerCount = 60    

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






function startQuiz() {
    initialDisplay.classList.remove("start");
    initialDisplay.classList.add("hidden");
    questionsDisplay.classList.remove("hidden");
    //startTimer
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
}

function checkAnswer(userAnswer) {
    if (userAnswer !== questions[questionCount].correctAnswer) {
    timerCount = timerCount - 10;
    questionCount++
    } else {
    questionCount++
    renderQuiz();
    }
}

answerChoicesDisplay.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        checkAnswer(event.target.textContent);
    }
})

