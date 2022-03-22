

//getting elements and saving them as 'private' variables by prepending underscore
const _question = document.getElementById('question');
const _multipleChoice = document.querySelector('.multiple-choice');
const _score = document.getElementById('score');
const _totalQuestions = document.getElementById('total-questions');
const _submitBtn = document.getElementById('submit');
const _playAgain = document.getElementById('play-again');
const _result = document.getElementById('result');

let correctAnswer = '', correctScore = 0 , askedCount = 0, totalQuestion = 10;

async function sendApiRequest(){
    const APIUrl = 'https://opentdb.com/api.php?amount=1&category=17&difficulty=easy&type=multiple';
    const result = await fetch(`${APIUrl}`);
    const data = await result.json();
    _result.innerHTML = "";
    positionAnswer(data.results[0]);
}

//listening for events and calling

function eventListeners(){
    _submitBtn.addEventListener('click', submitAnswer);
}

document.addEventListener('DOMContentLoaded', function(){
    sendApiRequest();
    eventListeners();
    _totalQuestions.textContent = totalQuestion;
    _score.textContent = correctScore;
});



function positionAnswer(data){
    _submitBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let multipleChoice = incorrectAnswer;
    multipleChoice.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    
    _question.innerHTML = `${data.question} <br> <span class="category"> ${data.category} </span>`
    _multipleChoice.innerHTML = `
        ${multipleChoice.map((option, index) =>`
            <li> ${index + 1}. <span> ${option} </span> </li>
        `).join('')}
    `;
    yourAnswer();
}

function yourAnswer(){
    _multipleChoice.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () => {
            if(_multipleChoice.querySelector('.selected')){
                const yourChoice = _multipleChoice.querySelector('.selected');
                yourChoice.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}

function submitAnswer(){
    _submitBtn.disabled = true;
    if(_multipleChoice.querySelector('.selected')){
        let chosenAnswer = _multipleChoice.querySelector('.selected span').textContent;
        if(chosenAnswer.trim() == htmlDecode(correctAnswer)){
            correctScore++;
            console.log(correctScore);
            _result.innerHTML = `<p> Correct Answer! </p>`
        } else {
            _result.innerHTML = `<p> Incorrect Answer! </p> <p><small><b>Correct Answer: </b> ${correctAnswer}</small></p>`
        }
        checkCount();
    }
}

function htmlDecode(textString){
    let doc = new DOMParser().parseFromString(textString, "text/html");
    return doc.documentElement.textContent;
}

function checkCount(){
    askedCount++;
    setCount+1;
    setCount();
    if(askedCount == totalQuestion){
        setTimeout(() =>{
            console.log("");
        }, 5000);
    } else {
        setTimeout(() => {
            sendApiRequest();
        }, 600);
    }
    finalScore();
}

function setCount(){
    _totalQuestions.textContent = totalQuestion;
    _score.textContent = correctScore;
}

function finalScore(){
    if(askedCount == totalQuestion){
        _result.innerHTML = `<p> Well done you scored: ${correctScore}</p>`;
    }
} 
