//  Declare elements 
var quizMainEl = document.querySelector("#quizMain");
var startSectionEl = document.querySelector("#startSection");
var startBtnEl = document.querySelector("#startBTN");
var timerEl = document.querySelector("#timer");
var startBtnEl = document.querySelector("#startBTN");
var headerEl = document.querySelector("header");
var scoreBtnEl = document.querySelector("#scoreBTN");

var questions = [];
var questionNumber = 0;
var score = 0;
var highScore = [];
var timeIntervalID;
var timeout = 900;

// Remove dom element from view and the consumed space
var hideContent = function (element) {

    element.className = "invisible";
};

// Remove dom element from view but not the consumed space
var hide  = function (element) {

    element.className = "hidden";
};

//Remove the Dom element with the matching selector
var removeElement = function (selector) {
    var element = document.querySelector(selector);
    if(element){
        element.remove();
    }
};

// Review previous scores from local storage
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

// Remove saved scores
var resetScores = function () {
    highScore = [];

    //Delete local storage
    localStorage.removeItem("highScore");
    removeElement("#highScores");
    displayHighScore();
};

// Load quesiton array
var loadQuestions = function () {
    questions = [
        {   'questionText': "What method disable even default behavior?",
            'choices': [ 
                {'answerText':"event.actionPrevent()",
                 'correct': false}, 
                 {'answerText':"event.preventDefault()", 
                 'correct': true},
                 {'answerText':"event.defaultPrevent()",
                 'correct': false}, 
                 {'answerText':"event.preventAction()",
                 'correct': false}
                ]
        },
        {   'questionText': "Which function will be hoisted at application load?",
            'choices': [ 
                {'answerText':"function myAction () {};",
                 'correct': true}, 
                 {'answerText':"var myAction = function () {};", 
                 'correct': false}
                ]
        },
        {   'questionText': "UI is short hand for ",
            'choices': [ 
                {'answerText':"User Intergration",
                 'correct': false}, 
                 {'answerText':"User Intelligence", 
                 'correct': false},
                 {'answerText':"Utility Instrument",
                 'correct': false}, 
                 {'answerText':"User Interaction",
                 'correct': true}]
        },
        {   'questionText': "CSS Specificity Hierarchy",
            'choices': [ 
                {'answerText':"IDs, (Classes, pseudo-classes, attribute selectors), Inline styles, (Elements and pseudo-elements)",
                 'correct': false}, 
                 {'answerText':"(Elements and pseudo-elements), Inline styles, (Classes, pseudo-classes, attribute selectors), IDs", 
                 'correct': false},
                 {'answerText':"Inline styles, IDs, (Classes, pseudo-classes, attribute selectors), (Elements and pseudo-elements)",
                 'correct': true}, 
                 {'answerText':"(Classes, pseudo-classes, attribute selectors), Inline styles, IDs, (Elements and pseudo-elements)",
                 'correct': false}]
        },
       /* {   'questionText': "Question 5",
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

//Start the quiz clock
var startClock = function () {
    timerEl.textContent = "Time: " + score;
    timeIntervalID = setInterval(countdown, 1000);
    function countdown () {
        if(score <= 0){
            clearInterval(timeIntervalID);
            timerEl.textContent = "Time: 0";

            return;
        }
        timerEl.textContent = "Time: " + (score--);
    }
};

// Construct question for display
var displayQuestion = function (questionNum) {
    // create list item
    var questionEl = document.createElement("section");
    questionEl.setAttribute("id","question");
    // add id as a custom attribute
    questionEl.setAttribute("data-question-id", questionNum);

    var questionTitle = document.createElement("h1");
    questionTitle.textContent = questions[questionNum].questionText;

    var answerListEl = document.createElement("ul");

    ///debugger;
    for(var i = 0; i < questions[questionNum].choices.length; i++) {
        var answerItemEl = document.createElement("li");
        answerItemEl.className = "answerOption";
        //answerItemEl.className = "answerOption primarySelector";
        // add id as a custom attribute
        answerItemEl.setAttribute("data-answer-id", i);
        answerItemEl.setAttribute("data-question-id", questionNum);
        answerItemEl.textContent = (i + 1) + '.  ' + questions[questionNum].choices[i].answerText;
        answerListEl.appendChild(answerItemEl);
    }

    questionEl.appendChild(questionTitle);
    questionEl.appendChild(answerListEl);
    quizMainEl.appendChild(questionEl);  
};

// Show score for round and collect player initials
var endRound = function () {
    var element = document.querySelector("#roundScore");
    if(element) {
        return;
    }

    //stop the clock
    clearInterval(timeIntervalID);
    if (score < 0){
        score =0;
    }

    removeElement("#question");
    timerEl.textContent = "Time: " + score;
   
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
    submitFormEl.className = "primarySelector";
    submitFormEl.setAttribute("type", "submit");
    submitFormEl.setAttribute("id", "initialsSubmit");
    submitFormEl.setAttribute("value", "Submit");
    formEl.appendChild(submitFormEl);

    quizOverEl.appendChild(formEl);        
    quizMainEl.appendChild(quizOverEl);    
};

// Show answer correctness
var displayAnswerStatus = function (status, questionEl) {
    var statusEL = document.createElement("h2");
    statusEL.className = "status"

    statusEL.textContent = status;
    questionEl.appendChild(statusEL);
}

// Determine answer correctness
var checkAnswer = function (questionID, answerID) {
    //find the question element using the questiondID
    var questionEl = document.querySelector("#question");
    var response = questions[questionID].choices[answerID].correct;
    
    if(!response) {
        displayAnswerStatus("Wrong!", questionEl);
    } else {
        displayAnswerStatus("Correct!", questionEl);
    }
    
    setTimeout(function(){questionEl.remove();}, timeout);  
    return response; 
};

// Process question answer
var answserHandler = function(clickedEl) {
    var answerId = clickedEl.getAttribute("data-answer-id");
    var questionId = clickedEl.getAttribute("data-question-id");

    //Parent ID
    var response = checkAnswer(questionId, answerId);

    if(!response) {
        score = score - 10;
    }
    
    questionNumber++;

    if (score <= 0 || questionNumber == questions.length) {
        // End round
        setTimeout(endRound, timeout);
    } else {
        setTimeout(function (){displayQuestion(questionNumber);}, timeout);
    }    
};

// Create HTML section to display high scores
var displayHighScore = function () {
    // Remove previous section from view
    removeElement("#roundScore");    
    hideContent(startSectionEl);
    
    var highScoreSecEl = document.createElement("section");
    highScoreSecEl.setAttribute("id", "highScores");

    var highScoresTitle = document.createElement("h1");
    highScoresTitle.textContent = "High Score";
    highScoreSecEl.appendChild(highScoresTitle);

    var scoreListEl = document.createElement("ul");
    
    // to set content for empty score list
    if ( highScore === undefined || highScore.length == 0){
        var scoreItemEl = document.createElement("li");
        scoreItemEl.className = "scoreItem";
        scoreItemEl.textContent = "No High Scores";
        scoreListEl.appendChild(scoreItemEl);
    } else {
        // Add scores to the list 
        for (var i = 0; i < highScore.length; i++) {
            var scoreItemEl = document.createElement("li");
            scoreItemEl.className = "scoreItem";
            scoreItemEl.textContent = (i + 1) + '.  ' + highScore[i].initials + " - " + highScore[i].score;
            scoreListEl.appendChild(scoreItemEl);
        }
    }

    highScoreSecEl.appendChild(scoreListEl);

    var goBackBtnEl = document.createElement("button");
    goBackBtnEl.className = "primarySelector";
    goBackBtnEl.setAttribute("id", "goBack");
    goBackBtnEl.textContent = "Go Back";
    var clearScoresBtnEl = document.createElement("button");
    clearScoresBtnEl.className = "primarySelector";
    clearScoresBtnEl.setAttribute("id", "clearScores");
    clearScoresBtnEl.textContent = "Clear high scores";

    highScoreSecEl.appendChild(goBackBtnEl);
    highScoreSecEl.appendChild(clearScoresBtnEl);
    quizMainEl.appendChild(highScoreSecEl);

    hideContent(headerEl);
    //headerEl.setAttribute("class", "hidden");
};

var saveHighScore = function() {
    localStorage.setItem("highScore", JSON.stringify(highScore));
};

// Recore score into array and local storage
var scoreRecorder = function (event) {
    event.preventDefault();

    //Check form input for iniitals
    var initials = document.querySelector("input[name='initials']").value;
    // check if input values are empty strings
    if (!initials || initials.length > 3) {
        alert("Enter your 2 or 3 charcter initials");
        return;
    }
    
    var scoreCard = { 
        'initials': initials.toUpperCase(),
        'score': score
    };

    highScore.push(scoreCard);
    saveHighScore();
     displayHighScore();
};

// Quiz back to the default
var resetQuiz = function () {
    var highScoreEl = document.querySelector("#highScores");
    if(highScoreEl){
        highScoreEl.remove();
    }

    questionNumber = 0;
    timerEl.textContent = "Time: 0";
    startSectionEl.className = "visible";
    headerEl.className = "visible";
};

// Determine which element was clicked and take apropriate action
var buttonHandler = function () {
    var clickedEl = event.target;
    
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
};

// Start the quiz
var startQuiz = function () {
    hideContent(startSectionEl);
    loadQuestions();
    score = questions.length * 10;
    startClock(score);
    displayQuestion(questionNumber);
};

loadHighScores();

// Add Event Listeners can only occur elements that exist at page loade
startBtnEl.addEventListener("click", startQuiz);
scoreBtnEl.addEventListener("click", displayHighScore);
quizMainEl.addEventListener("click", buttonHandler);
quizMainEl.addEventListener("submit", scoreRecorder);

/**/