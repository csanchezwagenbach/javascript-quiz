var initialDisplay = document.querySelector("#initial-display");
var questionsDisplay = document.querySelector("#questions-display");
function startQuiz() {
    initialDisplay.classList.remove("start");
    initialDisplay.classList.add("hidden");
    questionsDisplay.classList.remove("hidden");
}


let questions = [
    {
        q:'<your_question>',
        a:['a','b','c', 'd'],
        ca:'a'
    },
    {
        q:'<your_question>',
        a:['a','b','c', 'd'],
        ca:'a'
    },
]

console.log(questions[0].a)