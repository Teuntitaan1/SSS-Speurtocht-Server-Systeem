
// The current question list, it should be in this style
var CurrentQuestion = 0;
const QuestionList = [
    JSON.parse(`{"Title" : "Vraag 1", "Description" : "Werkt", "Option1" : "Willekeurig", "Option2" : "Antwoord", "Option3" : "Op een", "Option4" : "Knop", "CorrectAnswer" : "Option1"}`),
    JSON.parse(`{"Title" : "Vraag 2", "Description" : "Dit", "Option1" : "Maar", "Option2" : "Dan", "Option3" : "Nu", "Option4" : "Goed", "CorrectAnswer" : "Option2"}`),
    JSON.parse(`{"Title" : "Vraag 3", "Description" : "Nu", "Option1" : "Werkend", "Option2" : "(Hopelijk)", "Option3" : "Btw", "Option4" : "Dit", "CorrectAnswer" : "Option3"}`),
    JSON.parse(`{"Title" : "Vraag 4", "Description" : "Eindelijk", "Option1" : "Is", "Option2" : "Best", "Option3" : "Wel", "Option4" : "Leuk", "CorrectAnswer" : "Option2"}`),
    JSON.parse(`{"Title" : "Vraag 5", "Description" : "Eens", "Option1" : "Om", "Option2" : "Te", "Option3" : "Doen!", "Option4" : "Tot", "CorrectAnswer" : "Option1"}`),
    JSON.parse(`{"Title" : "Vraag 6", "Description" : "Goed", "Option1" : "Morgen", "Option2" : "In", "Option3" : "De", "Option4" : "Les", "CorrectAnswer" : "Option4"}`),
    JSON.parse(`{"Title" : "Vraag 7", "Description" : "En normaal?", "Option1" : "Dan", "Option2" : "Gaan", "Option3" : "We goed", "Option4" : "Werken", "CorrectAnswer" : "Option1"}`)
];




// triggers when the user presses one of the options provided by the question
function UserPressed(Option) {
    
    console.log(IsQuestionCorrect(Option));

    if (IsQuestionCorrect(Option)) {
        CurrentQuestion += 1;
        SetQuestion(QuestionList[CurrentQuestion]);
        document.getElementById("Outcome").innerHTML ="Goed gedaan!";
        
    }
    else {
        document.getElementById("Outcome").innerHTML = "Volgende keer beter!";
    }
}

// Validates the question
function IsQuestionCorrect(Option) {
    if (Option == QuestionList[CurrentQuestion]["CorrectAnswer"]) {
        return true;
    }
    return false;
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
//Sets the initial question
SetQuestion(QuestionList[CurrentQuestion]);