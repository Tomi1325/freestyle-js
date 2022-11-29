init();

// initial values
function init() {
    scores = [0, 0];
    currentPlayer = 0;
    roundScores = 0;
    isGameOn = true;

    document.querySelector('.dice').src = 'img/dice-1.png';
    document.querySelector('.dice').style.visibility = 'hidden';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.querySelector('.player-current-label-0').textContent = 'round points:';
    document.querySelector('.player-current-label-1').textContent = 'round points:';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player X';
    document.getElementById('name-1').textContent = 'Player Y';

    document.querySelector(`#current-or-winner-player-0`).textContent = 'Current player';
    document.querySelector(`#current-or-winner-player-1`).textContent = '';

    document.querySelector('.button-new').textContent = 'NEW GAME';
    document.querySelector('.button-roll').textContent = 'ROLL THE DICE';
    document.querySelector('.button-hold').textContent = 'I HOLD IT';
}

// event handler of the roll button
document.querySelector('.button-roll').addEventListener('click', function () {

    if (isGameOn) {
        document.querySelector(`#current-or-winner-player-${currentPlayer}`).textContent = 'Current player';

        // we need a random number between 1 an 6
        let randomNumber = Math.floor(Math.random() * 6) + 1;

        // display result
        let dice = document.querySelector('.dice');
        dice.src = `img/dice-${randomNumber}.png`;
        dice.style.visibility = 'visible';

        // update the scores of rounds if you roll a number other than 1
        if (randomNumber !== 1) {
            // add the number to the current score here
            roundScores += randomNumber;
            document.querySelector(`#current-${currentPlayer}`).textContent = roundScores;
        } else {
            document.querySelector(`#current-or-winner-player-${currentPlayer}`).textContent = '';
            // next player
            nextPlayer();
        }
    }
});

// event handler of the hold button
document.querySelector('.button-hold').addEventListener('click', function () {
    if (isGameOn) {
    // update total score in the code
    scores[currentPlayer] += roundScores;

    // update total score in the user interface (UI)
    document.querySelector(`#score-${currentPlayer}`).textContent = scores[currentPlayer];
    }

    // did the player win?
    if (scores[currentPlayer] >= 100) {
        document.querySelector(`#current-or-winner-player-${currentPlayer}`).textContent = 'Winner!';
        document.querySelector(`.player-${currentPlayer}-panel`).classList.add('winner');
        document.querySelector(`.player-${currentPlayer}-panel`).classList.remove('active');
        isGameOn = false;
    } else {
        document.querySelector(`#current-or-winner-player-${currentPlayer}`).textContent = '';
        // next player
        nextPlayer();
    }
});

// next player
function nextPlayer() {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScores = 0;
    document.querySelector(`#current-or-winner-player-${currentPlayer}`).textContent = 'Current player';
}

// start a new game
document.querySelector('.button-new').addEventListener('click', init);