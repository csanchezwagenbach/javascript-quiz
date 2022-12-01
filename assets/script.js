var initialDisplay = document.querySelector("#initial-display");
var questionsDisplay = document.querySelector("#questions-display");
var questionOnDisplay = document.querySelector("#question");
var answerChoices = document.querySelector("#answer-list");


var answerChoiceOne = document.createElement("li");
var answerChoiceTwo = document.createElement("li");
var answerChoiceThree = document.createElement("li");
var answerChoiceFour = document.createElement("li");
var answerChoiceBank = [answerChoiceOne, answerChoiceTwo, answerChoiceThree, answerChoiceFour];

var questionCount = 0;
     

var questions = [
    {
        questionText: "Which of the following does not represent a primitive type?",
        answerText:["Boolean","Number","Strand", "Undefined"],
        correctAnswer:"Strand"
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
        answerText: ["Around the corner", "Hiding inside your browser!", "Local storage? No such thing", "Here, there, everywhere"]
    }
]


    // questionOnDisplay.textContent = questions[i].questionText
    // 

questionOnDisplay.textContent = questions[0].questionText


function startQuiz() {
    initialDisplay.classList.remove("start");
    initialDisplay.classList.add("hidden");
    questionsDisplay.classList.remove("hidden");
    //startTimer
}  

function runQuiz () {
    if (questionCount < questions.length) {
        //increment questionCount with the event listener on the li's. 
        questionOnDisplay.textContent = questions[questionCount].questionText;
        for (var j = 0; j < answerChoiceBank.length; j++) {
            answerChoiceBank[j].textContent = questions[questionCount].answerText[j];
            answerChoices.appendChild(answerChoiceBank[j]);
        }
    }
}
    // for (var i=0; i < questions.length; i++) {
    //     questionOnDisplay.textContent = questions[questionCount].questionText;
    //     for (var j=0; j < answerChoiceBank.length; j++) {
    //         answerChoiceBank[j].textContent = questions[i].answerText[j];
    //         answerChoices.appendChild(answerChoiceBank[j]);
    //     }
    //     console.log(questionOnDisplay);
    //     console.log(answerChoices);
    // }
    //displayQuestions
    //displayAnswers
    //picks an answer with click
    //checkIfWrong 
    //display next question
    //display next answer etc. etc. 
    //this will run on a loop the length of the questions array.
    //endGame will be triggered upon this loop running out

runQuiz();

//I need to change this for loop to a while loop so that this will run so long as a given condition is true. 
//I will have a count var, and while count is < questions.array and timer < 0. At the end of the while loop I will increment it by one and so long as that count variable is remaining below the length of the questions array. We like the for loop for printing answers, we want the while loop for regulating the game pace/checking status of game 