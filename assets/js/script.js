window.onload = sendApiRequest

async function sendApiRequest() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&category=17&type=multiple`);
    console.log(response);
    let trivia = await response.json()
    console.log(trivia);
    inputTrivia(trivia);
}

function inputTrivia(trivia) {
    document.getElementById("question").innerHTML = trivia.results[0].question
    document.getElementById("answer1").innerHTML = trivia.results[0].correct_answer
    document.getElementById("answer2").innerHTML = trivia.results[0].incorrect_answers[0]
    document.getElementById("answer3").innerHTML = trivia.results[0].incorrect_answers[1]
    document.getElementById("answer4").innerHTML = trivia.results[0].incorrect_answers[2]
}

