var quizQuestions = [
{
    question: "What is the letter in the alphabet directly after a?",
    choices: ["d", "b", "Why is this relevant?", "Don't know, don't care."],
    correctAnswer: "b"
},
{
    question: "What is the letter in the alphabet directly after n?",
    choices: ["d", "o", "Why is this relevant?", "Don't know, don't care."],
    correctAnswer: "o"
}

];

var counter = 30;
var currentQuestion = 0;
var score = 0;
var losses = 0;
var timer;

// If the time is up, go to the next question

function nextQuestion(){

    var isQuestionOver = (quizQuestions.length -1)===currentQuestion;
    if(isQuestionOver){
        console.log("Game Over!!!");
        displayResult();
    }
    else{
    currentQuestion++;
    loadQuestion();
    }
}

function timeUp() {
    clearInterval(timer);
    nextQuestion();

}
function countDown(){
    counter--;
    $("#time").html("timer: " + counter);
    if(counter===0){
        timeUp();
        losses++;

    }
}


function loadQuestion(){
    counter = 3;

    timer = setInterval(countDown, 1000);
    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;
    $("#time").html("Timer: " + counter);
    $("#game").html(`<h4>${question}</h4>
    ${loadChoices(choices)}
    `);

}

function loadChoices(choices){
    var result = "";
    for(var i = 0; i < choices.length; i++){
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;
    }
    return result;
}

$(document).on("click",".choice", function(){
    clearInterval(timer);
    var selectedAnswer = $(this).attr("data-answer");
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;
    if(correctAnswer===selectedAnswer){
        score++;
        console.log("User Wins!")
        nextQuestion();
       
    }
    
    else{
        losses++;
        console.log("User Loses!");
        nextQuestion();
        
    };
    

})

function displayResult(){
    var result = `
    <p>You got ${score} question(s) right</p>
    <p>And you missed ${losses} question(s)</p>
    <p>out of ${quizQuestions.length} total questions!</p>
    <button>Reset Game</button>
    `;
    $("#game").html(result);
}

$(document).on("click", "#reset", function(){
    counter = 5;
    currentQuestion = 0;
    score = 0;
    losses = 0;
    timer = null;

    loadQuestion();
});;

loadQuestion();