
var quizBody = document.getElementById("quiz");
var resltsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("final-score");
var gameoverDiv = document.getElementById("gameover");
var questionEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbutton");
var startQuizDiv = document.getElementById("starting_page");
var highscoreContainer = document.getElementById("highScoreContainer");
var highscoreDiv = document.getElementById("high-scorepage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("high-score-initials");
var endGameButtons= document.getElementById("endofGameButtons");
var submitScoreBtn= document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("high-score-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var quizQuestions = [{
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "123",
    correctAnswer: "c"
},
{
    question: "What does DOM stand for?",
    choiceA: "Document Object Model",
    choiceB: "Display Object Management",
    choiceC: "Digital Ordinance Model",
    choiceD: "Desktop Oriented Mode",
    correctAnswer: "a"
},
{
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Python",
    choiceD: "React.js",
    correctAnswer:"b"
},
{
    question: "What HTML tags are JavaScript code wrapped in?",
    choiceA: "&lt;div&gt;",
    choiceB: "&lt;link&gt;",
    choiceC: "&lt;head&gt;",
    choiceD: "&lt;script&gt;",
    correctAnswer: "d"
},
{
    question: "When is localStorage data cleared?",
    choiceA: "No expiration time",
    choiceB: "On page reload",
    choiceC: "On browser close",
    choiceD: "On computer restart",
    correctAnswer: "a"
},
{
    question: "What does WWW stand for?",
    choiceA: "Web World Workings",
    choiceB: "Weak Winter Wind",
    choiceC: "World Wide Web",
    choiceD: "Wendy Wants Waffles",
    correctAnswer: "c"
},
{
    question: "What HTML attribute references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"
},    
];

var finalQuestionsIndex = quizQuestions.length;
var currentQuestionsIndex = 0;
var timeLeft = 81;
var timerInterval;
var score = 0;
var correct;




function generateQuizQuestions(){
    gameoverDiv.style.display = "none";
    if(currentQuestionsIndex === finalQuestionsIndex){
        return showScore();
    }
var currentQuestion = quizQuestions[currentQuestionsIndex];
    questionEl.innerHTML = "<p>" + currentQuestion.question + "<p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestions();

    timerInterval = setInterval(function(){
        timeLeft--;
        quizTimer.textContent = "Time left in seconds: "+ timeLeft;

        if(timeLeft === 0){
            clearInterval(timerInterval);
            showScore();
        }
    },1000);
    quizBody.style.display = "block";

}

function showScore(){
    quizBody.style.display = "none";
    gameoverDiv.style.display= "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You got " + score + "out of " + quizQuestions.length + " correct!";
}
submitScoreBtn.addEventListener("click",function highScore (){


    if(highscoreInputName.value === ""){
        alert("Initials cannot be blank");
        return false;
    }else{
    var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    var currentUser = highscoreInputName.value.trim();
    var currentHighScore = {
            name: currentUser,
            score: score
        };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameButtons.style.display = "flex";

        savedHighScores.push(currentHighScore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();
    }
});


function generateHighScores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i = 0; i < highScores.length; i++){
        var newNamesSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNamesSpan.textContent = highScores[i].name;
        newScoreSpan.textContent = highScores[i].score;
        highscoreDisplayName.appendChild(newNamesSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighScore(){
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameButtons.style.display = "flex";

    generateHighScores();
}

function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent ="";

}


function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 81;
    score = 0;
    currentQuestionsIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionsIndex].correctAnswer;

    if(answer === correct && currentQuestionsIndex !== finalQuestionsIndex){
        score++;
        alert("That is Correct!");
        currentQuestionsIndex++;
        generateQuizQuestions();
    }else if (answer !== correct && currentQuestionsIndex !== finalQuestionsIndex){
        alert("That Is Incorrect.")
        currentQuestionsIndex++;
        generateQuizQuestions();
    }else{
        showScore();
    }
}


startQuizButton.addEventListener("click", startQuiz);
