// Variables needed for the program,

// HTTP variables
const request = new XMLHttpRequest();
const URL = "http://localhost:8000";
//Functions for running the questions
var CurrentQuestion = 0;
var QuestionList = [];

//statistics for the end of the program
var Statistics = {"CorrectFirstTime" : 0, "TimeSpent" : 0};

// updates the TimeSpent index in Statistics
setInterval(() => {
    Statistics["TimeSpent"]++;
}, 1000);
//
//
//
// BEFORE QUEST FUNCTIONS
// Initial page setup, requests all the questions and displays them on the website
request.open("GET", URL);
request.send();
request.responseType = "json";
request.onload = () => {
  if (request.readyState == 4 && request.status == 200) {
    
    const data = request.response;
    // sets the QuestionList variable(frequently used throughout the program) to the recieved data from the server(should be a json file containing all the questions)
    QuestionList = data;
    AmountOfQuestions = QuestionList.length;

    // Dynamicly loads in all questions from the QuestionList dictionary
    var Index = 0;
    QuestionList.forEach(Question => {
        document.getElementById("SelectionScreen").innerHTML +=
            `<div id="${"Question" + Index}" class="QuestionSelection">

                <h3 class="QuestionSelectionTitle">${Question["Title"]}</h3>
                <img src="./Images/checkmark.png" class="QuestionSelectionCheckmark"/>
                
                <form name="QuestionCodeInput${Index}" onsubmit="ValidateCode(${Index});return false">
                
                    Code: <input type="text" name="Code">
                    <input type="submit" value="Submit">
                    
                </form>

                <p id="FormOutcome${Index}"></p>

            </div>`; 
        Index += 1;
    });

  } else {
    console.log(`Error: ${request.status}`);
  }
};

//
//
//
// DURING QUEST FUNCTIONS


// checks the inputted code for the question 
function ValidateCode(QuestionNumber) {
    
    //checks the value of the QuestionForm and makes it lowercase so the secret code isnt case sensitive
    if(document.forms[`QuestionCodeInput${QuestionNumber}`]["Code"].value.toLowerCase() == QuestionList[QuestionNumber]["Code"]) {
        document.getElementById(`FormOutcome${QuestionNumber}`).innerHTML = "Goed zo!";
        SetCurrentQuestion(QuestionNumber);
    }
    else {
        document.getElementById(`FormOutcome${QuestionNumber}`).innerHTML = "Helaas, probeer het nog een keer!";
    }

}

// transitions the page from the selection screen to the answer screen
function SetCurrentQuestion(QuestionNumber) {
    
    CurrentQuestion = QuestionNumber; 
    SetQuestion(QuestionList[CurrentQuestion]);
    document.getElementById("SelectionScreen").style.display = "none";
    document.getElementById("QuestionScreen").style.display = "block";

    }

// locks the question so the user cant answer the same questions multiple times
function LockQuestion() {
   
    document.getElementById("Question"+CurrentQuestion).children.item(1).style.visibility = "visible";
    document.getElementById("Question"+CurrentQuestion).children.item(2).style.visibility = "hidden";
 
}

// triggers when the user presses one of the options provided by the question
function UserPressed(Option) {
    
    console.log(Option == QuestionList[CurrentQuestion]["CorrectAnswer"]);

    if (Option == QuestionList[CurrentQuestion]["CorrectAnswer"]) {
        document.getElementById("SelectionScreen").style.display = "block";
        document.getElementById("QuestionScreen").style.display = "none";
        LockQuestion();  
    }
}

// updates the question div to the new question
function SetQuestion(Question) {

    document.getElementById("Title").innerHTML = Question["Title"];
    document.getElementById("Description").innerHTML = Question["Description"];
    document.getElementById("Option1").innerHTML = Question["Option1"];
    document.getElementById("Option2").innerHTML = Question["Option2"];
    document.getElementById("Option3").innerHTML = Question["Option3"];
    document.getElementById("Option4").innerHTML = Question["Option4"];
}