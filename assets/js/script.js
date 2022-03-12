//  Declare elements 
var quizMainEl = document.querySelector("#quizMain");
var startSectionEl = document.querySelector("#startSection");
var startBtnEl = document.querySelector("#startBTN");
var timerEl = document.querySelector("#timer");
var startBtnEl = document.querySelector("#startBTN");
var headerEl = document.querySelector("header");
var scoreBtnEl = document.querySelector("#scoreBTN");

//var highScoreEl  = document.querySelector();
//var timerEl = document.querySelector();
var questions = [];
var questionNumber = 0;
var score = 0;
var highScore = [];
var timeIntervalID;

// Will likely be local to functions passed as argument
// var questionMainEl = document.querySelector();

var hideContent = function (element) {

    element.className = "invisible";
};

var loadHighScores = function () {
    //Gets scores from localStorage.
    highScore = localStorage.getItem("highScore");
  
    if (highScore === null) {
        highScore = [];
    } else {  
        //Converts highscore from the string format back into an array of objects.
        highScore = JSON.parse(highScore);
    }
};

var resetScores = function () {
    highScore = [];

    //Delete local storage
    localStorage.removeItem("highScore");
};

var loadQuestions = function () {
    questions = [
        {   'questionText': "Question 1",
            'choices': [ 
                {'answerText':"A",
                 'correct': false}, 
                 {'answerText':"B", 
                 'correct': true},
                 {'answerText':"C",
                 'correct': false}, 
                 {'answerText':"D",
                 'correct': false}]
        },
        /*{   'questionText': "Question 2",
            'choices': [ 
                {'answerText':"A",
                 'correct': true}, 
                 {'answerText':"B", 
                 'correct': false},
                 {'answerText':"C",
                 'correct': false}, 
                 {'answerText':"D",
                 'correct': false}]
        },
        {   'questionText': "Question 3",
            'choices': [ 
                {'answerText':"A",
                 'correct': false}, 
                 {'answerText':"B", 
                 'correct': false},
                 {'answerText':"C",
                 'correct': false}, 
                 {'answerText':"D",
                 'correct': true}]
        },
        {   'questionText': "Question 5",
            'choices': [ 
                {'answerText':"A",
                 'correct': false}, 
                 {'answerText':"B", 
                 'correct': false},
                 {'answerText':"C",
                 'correct': true}, 
                 {'answerText':"D",
                 'correct': false}]
        },
        {   'questionText': "Question 5",
            'choices': [ 
                {'answerText':"A",
                 'correct': true}, 
                 {'answerText':"B", 
                 'correct': false},
                 {'answerText':"C",
                 'correct': false}, 
                 {'answerText':"D",
                 'correct': false}]
        }, */
    ];
};

var startClock = function () {
    timerEl.textContent = "Time: " + score;
    timeIntervalID = setInterval(countdown, 1000);
    function countdown () {
        timerEl.textContent = "Time: " + (score--);
        if(score <= -1){
            clearInterval(timeIntervalID);
        }
    }
};

var displayQuestion = function (questionNum) {
// Construct question for display

 //   console.log(JSON.stringify(questions));
    // create list item
    var questionEl = document.createElement("section");
    questionEl.className = "question";
    // add id as a custom attribute
    questionEl.setAttribute("data-question-id", questionNum);

    var questionTitle = document.createElement("h1");
    questionTitle.textContent = questions[questionNum].questionText;

    var answerListEl = document.createElement("ol");

    ///debugger;
    for(var i = 0; i < questions[questionNum].choices.length; i++) {
        var answerItemEl = document.createElement("li");
        answerItemEl.className = "answerOption";
        // add id as a custom attribute
        answerItemEl.setAttribute("data-answer-id", i);
        answerItemEl.setAttribute("data-question-id", questionNum);
        answerItemEl.textContent = questions[questionNum].choices[i].answerText;
        answerListEl.appendChild(answerItemEl);
    }

    questionEl.appendChild(questionTitle);
    questionEl.appendChild(answerListEl);
    quizMainEl.appendChild(questionEl);  
};

var endRound = function () {
    //stop the clock
    clearInterval(timeIntervalID);
    score++;  //Add 1 back to the clock

    //Create Round Stats Section
    var quizOverEl = document.createElement("section"); 
    quizOverEl.setAttribute("id", "roundScore");
    var titleEL = document.createElement("h1");
    titleEL.textContent = "All done!";
    quizOverEl.appendChild(titleEL);

    var scoreStatmentEl = document.createElement("p");
    scoreStatmentEl.setAttribute("id", "finalScore");
    scoreStatmentEl.textContent = "Your final score is " + score + ".";
    quizOverEl.appendChild(scoreStatmentEl);

    var formEl = document.createElement("form");
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "initials");
    labelEl.textContent = "Enter initials:";
    formEl.appendChild(labelEl);

    var textInputEl = document.createElement("input");
    textInputEl.setAttribute("type", "text");
    textInputEl.setAttribute("name", "initials");
    textInputEl.setAttribute("class", "initials");
    formEl.appendChild(textInputEl);

    var submitFormEl = document.createElement("input");
    submitFormEl.setAttribute("type", "submit");
    submitFormEl.setAttribute("id", "initialsSubmit");
    submitFormEl.setAttribute("value", "Submit");
    formEl.appendChild(submitFormEl);

    quizOverEl.appendChild(formEl);        
    quizMainEl.appendChild(quizOverEl);    
};

var displayAnswerStatus = function (response, questionEl) {
    var responseEL = document.createElement("h2");

    responseEL.textContent = response;
    questionEl.appendChild(responseEL);
}

var checkAnswer = function (questionID, answerID) {
    //find the question element using the questiondID
    var questionEl = document.querySelector(".question");
    var response = questions[questionID].choices[answerID].correct;
    
    if(!response) {
        displayAnswerStatus("Wrong!", questionEl);
    } else {
        displayAnswerStatus("Correct!", questionEl);
    }
    console.log("checkAnswer");
    setTimeout(function(){questionEl.remove();}, 2500);  
    return response; 
};

var answserHandler = function(clickedEl) {
    var answerId = clickedEl.getAttribute("data-answer-id");
    var questionId = clickedEl.getAttribute("data-question-id");

    //Parent ID
    var response = checkAnswer(questionId, answerId);
    console.log("answerHandler");

    if(!response) {
        score = score - 10;
    }
    
    questionNumber++;

    if (score <= 0 || questionNumber == questions.length) {
        // End round
        setTimeout(endRound, 2500);
    } else {
        displayQuestion(questionNumber);
    }    
};

// Create HTML section to display high scores
var displayHighScore = function () {
    var highScoreSecEl = document.createElement("section");
    highScoreSecEl.setAttribute("id", "highScores");

    var highScoresTitle = document.createElement("h1");
    highScoresTitle.textContent = "High Score";
    highScoreSecEl.appendChild(highScoresTitle);

    var scoreListEl = document.createElement("ol");
    
    // to set content for empty score list
    if ( highScore === undefined || highScore.length == 0){
        var scoreItemEl = document.createElement("li");
        scoreItemEl.textContent = "No High Scores";
        scoreListEl.appendChild(scoreItemEl);
    } else {
        // Add scores to the list 
        for (var i = 0; i < highScore.length; i++) {
            var scoreItemEl = document.createElement("li");
            scoreItemEl.textContent = highScore[i].initials + " - " + highScore[i].score;
            scoreListEl.appendChild(scoreItemEl);
        }
    }

    highScoreSecEl.appendChild(scoreListEl);

    var goBackBtnEl = document.createElement("button");
    goBackBtnEl.setAttribute("id", "goBack");
    goBackBtnEl.textContent = "Go Back";
    var clearScoresBtnEl = document.createElement("button");
    clearScoresBtnEl.setAttribute("id", "clearScores");
    clearScoresBtnEl.textContent = "Clear high scores";

    highScoreSecEl.appendChild(goBackBtnEl);
    highScoreSecEl.appendChild(clearScoresBtnEl);
    quizMainEl.appendChild(highScoreSecEl);

    hideContent(startSectionEl);
    headerEl.setAttribute("class", "invisible");
};

var saveHighScore = function() {
    localStorage.setItem("highScore", JSON.stringify(highScore));
};


var scoreRecorder = function (submitBtn) {
    console.log("scoreRecorder");
    //Check form input for iniitals
    var initials = document.querySelector("input[name='initials']").value;
    // check if input values are empty strings
    if (!initials || initials.length > 3) {
        alert("Enter your 2 or 3 charcter initials");
    }
    // remove  or hide quizover 
    // call highsore display
    var scoreCard = { 
        'initials': initials.toUpperCase(),
        'score': score
    };

    highScore.push(scoreCard);
    saveHighScore();
    displayHighScore();
};

var resetQuiz = function () {
    var highScoreEl = document.querySelector("#highScores");
    if(highScoreEl){
        highScoreEl.remove();
    }

    startSectionEl.className = "visible";
    headerEl.className = "visible";
};

var buttonHandler = function () {
    var clickedEl = event.target;
    
    console.log(clickedEl);
    // answer selected
    if (clickedEl.matches(".answerOption")){
        answserHandler(clickedEl); 
    } 
    else if (clickedEl.matches("#goBack")) {
        resetQuiz();
    }
    else if (clickedEl.matches("#clearScores")) {
        resetScores();
    }
    console.log("buttonHander Exited");
};

var startQuiz = function () {
    event.preventDefault();
    
    console.log("startQuiz entered");
    hideContent(startSectionEl);
    loadQuestions();
    score = questions.length * 10;
    startClock(score);
    displayQuestion(questionNumber);
    console.log("startQuiz exited");
};

resetQuiz();
loadHighScores();
//Testin calls

/*
*/
// Add Event Listeners can only occur elements that exist at page loade?
startBtnEl.addEventListener("click", startQuiz);
// Not loading properly with this event listener
//scoreBtnEl.addEventListener("click", displayHighScore());
quizMainEl.addEventListener("click", buttonHandler);
quizMainEl.addEventListener("submit", scoreRecorder);