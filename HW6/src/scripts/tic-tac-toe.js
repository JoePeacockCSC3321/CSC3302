//constant initializers
const gameStatus = document.querySelector('.prompt');
const winningConditions =   [[0, 1, 2], [3, 4, 5], [6, 7, 8], //straight across
                            [0, 3, 6], [1, 4, 7], [2, 5, 8],  //up and down
                            [0, 4, 8], //down and to the right
                            [2, 4, 6]]; //down to the left
//variable initializers
let gameActive = true;
let letterInPlay = "X";
let board = ["", "", "", "", "", "", "", "", ""];

gameStatus.innerHTML = `${letterInPlay} is in play`;

function placeLetter(squarePlayed, squareIndex)
{ 
    board[squareIndex] = letterInPlay; 
    squarePlayed.innerHTML = letterInPlay;
}

function changePlayer()
{
    letterInPlay = letterInPlay === "X" ? "O" : "X"; //if X, then switch to O; else if not X (only possibly O), switch to X
    gameStatus.innerHTML = `${letterInPlay} is in play`;
}

function mainLoop()
{
    let returnWin = false;

    for (let i = 0; i <= 7; i++)
    { 

        const winCondition = winningConditions[i]; //load individual possible win condition from win condition array
        let squareBufferOne = board[winCondition[0]]; //first value to check
        let squareBufferTwo = board[winCondition[1]]; //second value to check
        let squareBufferThree = board[winCondition[2]]; //third value to check

        if (squareBufferOne === '' || squareBufferTwo === '' || squareBufferThree === '')//skip over blank squares
        {
                 continue; 
        }

        if (squareBufferOne === squareBufferTwo && squareBufferTwo === squareBufferThree)//if win condition is met, return win
        {
                 returnWin = true; 
                 break
        }
    }

    if (returnWin) //Wincondition check & display message
        {
            gameStatus.innerHTML = `WINNER: ${letterInPlay}`;
            gameActive = false;
             return;
        }

    let returnTie = !board.includes("");


    if (returnTie) //Tiecondition check & display message
        {
            gameStatus.innerHTML = `DRAW! YOU BOTH LOSE!`;
            gameActive = false;
            return;
        }

    changePlayer();

}

function registerMove(clickedCellEvent) //disable invailid moves
{
    const squarePlayed = clickedCellEvent.target;
    const squareIndex = parseInt(squarePlayed.getAttribute('square-index'));
    if (board[squareIndex] !== "" || !gameActive) //if its not empty, dont allow a placement
    {
        return;
    }
    placeLetter(squarePlayed, squareIndex); //if it is empty, allow placement
    mainLoop();
}

function resetGame() //set everything back to initial parameters
{
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];
    letterInPlay = "X";
    gameStatus.innerHTML = `${letterInPlay} is in play`;
    document.querySelectorAll('.square').forEach(square => square.innerHTML = "");
}

//initialize event handlers 
document.querySelectorAll('.square').forEach(square => square.addEventListener('click', registerMove));
document.querySelector('.reset').addEventListener('click', resetGame);