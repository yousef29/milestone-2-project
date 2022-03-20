window.onload = sendApiRequest
let trivia = ""
const multipleChoice = document.querySelector('.multiple-choice');

async function sendApiRequest() {
    let apiUrl = 'https://opentdb.com/api.php?amount=1&category=17&type=multiple';
    let response = await fetch(`${apiUrl}`);
    trivia = await response.json()
    //inputTrivia(trivia);
    positionAnswer(trivia.results[0]);
}

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

    yourAnswer();
}

function yourAnswer(){
    multipleChoice.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(multipleChoice.querySelector('.selected')){
                let yourChoice = multipleChoice.querySelector('.selected');
                yourChoice.classList.remove('.selected');
            }
            option.classList.add('.selected');
        });
    });
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
 
