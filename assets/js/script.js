//  Declare elements 
var startMainEl = document.querySelector("#startMain");
var startSectionEl = document.querySelector("#startSection");
console.log(startSectionEl);
var startBtnEl = document.querySelector("#startBTN");

//var highScoreEl  = document.querySelector();
//var timerEl = document.querySelector();
var questions = [];
var questionNumber = 0;
var score = 0;
var highScore = [];

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
    ];
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
    startMainEl.appendChild(questionEl);
   
    //questionEl.remove();
};

// Develop functions
var checkAnswer = function (questionID, answerID) {
    if(questions[questionID].choices[answerID].correct) {
        console.log("Correct");
    } else {
        console.log("Wrong");        
    }
};

var answserHandler = function(event) {
    var clickedEl = event.target;

    // edit button was clicked
    if (clickedEl.matches(".answerOption")) {
        var answerId = clickedEl.getAttribute("data-answer-id");
        var questionId = clickedEl.getAttribute("data-question-id");

        //Parent ID
        checkAnswer(questionId, answerId);
    } 
};

var startQuiz = function () {
    event.preventDefault();
    
    hideContent(startSectionEl);
    loadQuestions();
    displayQuestion(questionNumber);
};


//Testin calls

// Add Event Listeners can only occur elements that exist at page loade?
startBtnEl.addEventListener("click", startQuiz);
startMainEl.addEventListener("click", answserHandler);
