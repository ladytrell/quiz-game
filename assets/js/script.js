//  Declare elements 
var quizMainEl = document.querySelector("#quizMain");
var startSectionEl = document.querySelector("#startSection");
var startBtnEl = document.querySelector("#startBTN");
var timerEl = document.querySelector("#timer");

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
    textInputEl.setAttribute("id", "initials");
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
        endRound();
    } else {
        displayQuestion(questionNumber);
    }    
};

var buttonHandler = function () {
    var clickedEl = event.target;

    // answer selected
    if (clickedEl.matches(".answerOption")){
        answserHandler(clickedEl); 
    } 
    else if (clickedEl.matches("#initialsSubmit")) {
        console.log("clicked submit");
    }
};

var startQuiz = function () {
    event.preventDefault();
    
    hideContent(startSectionEl);
    loadQuestions();
    score = questions.length * 10;
    startClock(score);
    displayQuestion(questionNumber);
    console.log("startQuiz");
};


//Testin calls

//*
// Add Event Listeners can only occur elements that exist at page loade?
startBtnEl.addEventListener("click", startQuiz);
quizMainEl.addEventListener("click", buttonHandler);
//quizMainEl.addEventListener("click", answserHandler);
//*/