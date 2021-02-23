
let quizBody = document.getElementById("quiz");
let resltsEl = document.getElementById("result");
const finalScoreEl = document.getElementById("final-score");
const gameoverDiv = document.getElementById("gameover");
const questionEl = document.getElementById("questions");
const quizTimer = document.getElementById("timer");
const startQuizButton = document.getElementById("startbutton");
const startQuizDiv = document.getElementById("starting_page");
const highscoreContainer = document.getElementById("highScoreContainer");
const highscoreDiv = document.getElementById("high-scorepage");
const highscoreInputName = document.getElementById("initials");
const highscoreDisplayName = document.getElementById("high-score-initials");
const endGameButtons= document.getElementById("endofGameButtons");
const submitScoreBtn= document.getElementById("submitScore");
const highscoreDisplayScore = document.getElementById("high-score-score");
const buttonA = document.getElementById("a");
const buttonB = document.getElementById("b");
const buttonC = document.getElementById("c");
const buttonD = document.getElementById("d");


const quizQuestions = [{
    question: "How many elements can you apply an 'ID' attribute to?",
    choiceA: "As many as you want",
    choiceB: "3",
    choiceC: "1",
    choiceD: "128",
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
    question: "What HTML attributt references an external JavaScript file?",
    choiceA: "href",
    choiceB: "src",
    choiceC: "class",
    choiceD: "index",
    correctAnswer: "b"
},    
];


const finalQuestionsIndex = quizQuestion.length;
const currentQuestionsIndex = 0;
const timeLeft = 76;
const timerInterval;
const score = 0;
const correct;


function generateQuizQuestions(){
    gameoverDiv.style.display = "none";
    if(currentQuestionsIndex === finalQuestionsIndex){
        return showScore();
    }
    const currentQuestion = quizQuestion[currentQuestionsIndex];
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
        quizTimer.textContent = "Time left: "+ timeLeft;

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
        const savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        const currentUser = highscoreInputName.value.trim();
        const currentHighScore = {
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
    const highScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i = 0; i <highScores.length; i++){
        const newNamesSpan = document.createElement("li");
        const newScoreSpan = document.createElement("li");
        newNamesSpan.textContent = highScores[i].name;
        newScoreSpan.textContent = highScores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
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
    timeLeft = 76;
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
