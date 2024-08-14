// script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'x'; // 'x' or 'o'
let gameState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-index');

    if (gameState[cellIndex] !== null) return;

    gameState[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer);

    if (checkWin()) {
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 10);
        endGame();
    } else if (!gameState.includes(null)) {
        setTimeout(() => alert("It's a draw!"), 10);
        endGame();
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', handleCellClick));
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = 'x';
}