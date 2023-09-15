const gameCells = document.querySelectorAll('.cell');

const player1 = document.querySelectorAll('.player1');
const player2 = document.querySelectorAll('.player2');

const restartButton = document.querySelectorAll('.rebutton');

// making variables
let currPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currPlayer;

player1.textContent = `Player 1: ${currPlayer}`;
player2.textContent = `Player 2: ${nextPlayer}`;

// function to start game
const startGame = () => {
    
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

// function to change player's turn
const changeTurn = () => {
    if(playerTurn === currPlayer ) {
        playerTurn = nextPlayer;
    }
    else {
        playerTurn = currPlayer;
    }

}

// function to check win
const checkWin = () => {
    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];
        if(gameCells[pos1].textContent !== '' && gameCells[pos1].textContent == gameCells[pos2].textContent && gameCells[pos2].textContent
         === gameCells[pos3].textContent) {
            return true;
        }
    }
    return false;
}

const checkTie = () => {
    let emptycellscount = 0;
    gameCells.forEach(cell => {
        if(cell.textContent === '') {
            emptycellscount++;
        }
    });

    return emptycellscount === 0 && !checkWin();
}

const handleClick = (e) => {
    if(e.target.textContent === '') {
        // console.log(e.target);
        e.target.textContent = playerTurn;
        if(checkWin()) {
            disableGame();
        }
        else if(checkTie()) {
            disableGame();
        }
        else changeTurn();
    }
}

const disableGame = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

// restartButton.addEventListener('click', restartGame);


// const restartGame = () => {
//     gameCells.forEach(cell => {
//         cell.textContent = '';
//         cell.classList.remove('disabled');
//     });
//     startGame();
// }


startGame();