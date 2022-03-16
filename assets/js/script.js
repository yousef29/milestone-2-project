window.onload = sendApiRequest

async function sendApiRequest() {
    let response = await fetch(`https://opentdb.com/api.php?amount=1&category=17&type=multiple`);
    console.log(response);
    let trivia = await response.json()
    console.log(trivia);
    inputTrivia(trivia);
}

