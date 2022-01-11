const choices = ["rock", "paper", "scissors"];
let playerChoice = "";
let AIChoice = "";
let playerScore = 0;
let AIScore = 0;

const audio = new Howl({
    src: ['/audio/easy-lemon.mp3'],
    autoplay: true,
    loop: true,
    volume: .1,
});

const winAudio = new Howl({
    src: ['/audio/win.wav'],
    autoplay: false,
    loop: false,
    volume: .3
})

const loseAudio = new Howl({
    src: ['/audio/lose.wav'],
    autoplay: false,
    loop: false,
    volume: .3
})

const tieAudio = new Howl({
    src: ['/audio/tie.wav'],
    autoplay: false,
    loop: false,
    volume: .3
})

audio.play();

function playRound(choice) {
    playerChoice = choice.target.dataset.name;
    choice.target.classList.add("clicked");
    AIChoice = getAIChoice();
    document.querySelector("#ai-choice").src = `/images/${AIChoice}.png`;
    decideWinner(playerChoice, AIChoice);
}

const getAIChoice = () => choices[Math.floor(Math.random() * 3)];

const gameWin = () => {
    playerScore ++;
    winAudio.play();
    document.querySelector("h1").textContent = "WINNER";
    document.querySelector("#p-score").textContent = `Player Score: "${playerScore}"`; 
}

const gameLose = () => {
    AIScore ++;
    loseAudio.play();
    document.querySelector("h1").textContent = "LOSER";
    document.querySelector("#ai-score").textContent = `AI Score: "${AIScore}"`; 
}

const gameTie = () => {
    tieAudio.play();
    document.querySelector("h1").textContent = "TIE";
}

function decideWinner(pl, AI) {
    if(pl == AI) {
        gameTie();
    }
    else if( (pl=='rock'&&AI=='scissors')||(pl=='paper'&&AI=='rock')||(pl=='scissors'&&AI=='paper') ) {
        gameWin();
    } else {
        gameLose()
    }
}

choiceImages = document.querySelectorAll(".choice");
choiceImages.forEach( (choice) => {
    choice.addEventListener("click", playRound);
    choice.addEventListener("transitionend", (choice) => {
        choice.target.classList.remove("clicked")}); 
})

