// currently hardcoded variables
var CurrentQuestion = 0;
const QuestionList = [
    
    {"Title" : "Vraag 1", "Description" : "Werkt", "Code" : "bij",
      "Option1" : "Willekeurig", "Option2" : "Antwoord", "Option3" : "Op een", "Option4" : "Knop", "CorrectAnswer" : "Option1"},

    {"Title" : "Vraag 2", "Description" : "Dit", "Code" : "honing",
     "Option1" : "Maar", "Option2" : "Dan", "Option3" : "Nu", "Option4" : "Goed", "CorrectAnswer" : "Option2"},

    {"Title" : "Vraag 3", "Description" : "Nu", "Code" : "bloem",
     "Option1" : "Werkend", "Option2" : "(Hopelijk)", "Option3" : "Btw", "Option4" : "Dit", "CorrectAnswer" : "Option3"},

    {"Title" : "Vraag 4", "Description" : "Eindelijk", "Code" : "nectar",
     "Option1" : "Is", "Option2" : "Best", "Option3" : "Wel", "Option4" : "Leuk", "CorrectAnswer" : "Option2"},

    {"Title" : "Vraag 5" , "Description" : "Eens", "Code" : "planten",
     "Option1" : "Om", "Option2" : "Te", "Option3" : "Doen!", "Option4" : "Tot", "CorrectAnswer" : "Option1"},

    {"Title" : "Vraag 6", "Description" : "Goed", "Code" : "bestuiven",
     "Option1" : "Morgen", "Option2" : "In", "Option3" : "De", "Option4" : "Les", "CorrectAnswer" : "Option4"},

    {"Title" : "Vraag 7", "Description" : "En normaal?", "Code" : "imker",
     "Option1" : "Dan", "Option2" : "Gaan", "Option3" : "We goed", "Option4" : "Werken", "CorrectAnswer" : "Option1"},

];


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


// This executes after the initial page load
// Dynamicly loads in all questions from the QuestionList dictionary
var Index = 0
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
