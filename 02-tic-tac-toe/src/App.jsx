import { useState } from 'react';
import confetti from 'canvas-confetti';
import { TURNS } from './constants.js';
import { Square } from './components/Square.jsx';
import { DrawBoard } from './components/DrawBoard.jsx';
import { checkWinnerFrom, checkEndGame } from './logic/board.js';
import { WinnerModal } from './components/WinnerModal.jsx';
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null no ganador, false empate, true ganador

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage;
  };

  const updatedBoard = (index) => {
    // No actualizar tablero si ya tiene algo en esa posición
    // o si ya hay ganador
    if (board[index] || winner) return;

    //Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage(newBoard, newTurn);

    // revisar si hay un ganador
    const winnerCheck = checkWinnerFrom(newBoard); // se debe manda el nuevo tablero, por ser asíncrono. Sino puede dar que no hay ganador
    if (winnerCheck) {
      setWinner(winnerCheck); // LA ACTUALIZACIÓN DEL ESTADO ES ASÍNCRONO
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false); // Empate
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>

      <button onClick={resetGame}>Reset Game</button>
      <section className="game">
        <DrawBoard board={board} updatedBoard={updatedBoard} />
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;

