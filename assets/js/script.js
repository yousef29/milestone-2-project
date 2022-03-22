window.onload = sendApiRequest

//getting elements and saving them as 'private' variables by prepending underscore
const _question = document.getElementById('question');
const _multipleChoice = document.querySelector('.multiple-choice');
const _score = document.getElementById('score');
const _totalQuestions = document.getElementById('total-questions');
const _submitBtn = document.getElementById('submit');
const _playAgain = document.getElementById('play-again');
const _result = document.getElementById('result');

let correctAnswer = "", correctScore = 0 , askedCount = 0, totalQuestion =10;

async function sendApiRequest(){
    const APIUrl = 'https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    _result.innerHTML = "";
    positionAnswer(data.results[0]);
}

//listening for events and calling api
function eventListeners(){
    _submitBtn.addEventListener('click', submitAnswer);
}

document.addEventListener('DOMContentLoaded', function(){
    sendApiRequest();
    eventListeners();
    _totalQuestions.textContent = totalQuestion;
    _score.textContent = correctScore;
});

function positionAnswer(trivia){
    let correctAnswer = trivia.correct_answer;
    let incorrectAnswer = trivia.incorrect_answers;
    let assignAnswer = incorrectAnswer;
    assignAnswer.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);

    multipleChoice.innerHTML = `
        ${assignAnswer.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    console.log(correctAnswer);
    
    checkClicks();
    yourAnswer();
}

function yourAnswer(){
    multipleChoice.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(multipleChoice.querySelector('.selected')){
                let yourChoice = multipleChoice.querySelector('.selected');
                yourChoice.classList.remove('selected');
            }
            option.classList.add('selected');
        });      
    });
}



function submitAnswer(){
    submitBtn.disabled = true;
    if(multipleChoice.querySelector('.selected')){
        let chosenAnswer = multipleChoice.querySelector('.selected span').textContent;
        console.log(chosenAnswer);
        if(chosenAnswer.trim() == htmlDecode(correctAnswer)){
            yourScore++;
            response.innerHTML = `<p> Correct! Well done </p>`;
        } else {
            response.innerHTML = `<p> Oops incorrect! Correct answer:${correctAnswer} </p>`;
        }
    }
}

function htmlDecode(input){
    let parser = new DOMParser().parseFromString(input, "text/html")
    return parser.documentElement.textContent;
}



/*
function inputTrivia(trivia) {
    document.getElementById("question").innerHTML = trivia.results[0].question
    document.getElementById("answer1").innerHTML = trivia.results[0].correct_answer
    document.getElementById("answer2").innerHTML = trivia.results[0].incorrect_answers[0]
    document.getElementById("answer3").innerHTML = trivia.results[0].incorrect_answers[1]
    document.getElementById("answer4").innerHTML = trivia.results[0].incorrect_answers[2]
}
*/
 
