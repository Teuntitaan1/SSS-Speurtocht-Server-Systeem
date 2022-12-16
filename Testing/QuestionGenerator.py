import json

Question = {
    "Title" : input("Wat is de titel van de vraag? "),
    "Description" : input("Wat is de vraag? "),
    "Option1" : input("Wat is de 1e mogelijke optie van de vraag? "),
    "Option2" : input("Wat is de 2e mogelijke optie van de vraag? "),
    "Option3" : input("Wat is de 3e mogelijke optie van de vraag? "),
    "Option4" : input("Wat is de 4e mogelijke optie van de vraag? "),
    "CorrectAnswer" : "Option"+input("Wat is het correcte antwoord van de vraag(antwoord met 1,2,3 of 4) ")
    }
print(Question)
QuestionJson = json.dumps(Question)
print(QuestionJson) 