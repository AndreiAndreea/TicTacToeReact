import './App.css';
import { useState } from 'react';
import  Square  from './components/square/square';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

export default App;

function Board({ xIsNext, squares, onPlay }: any) {

  function handleCLick(i: any) {
    //if there is already a value in the square, stop. dont overwrite it
    if (squares[i] || calculateWinner(squares))
      return;

    const nextSquares = squares.slice();

    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="boardRow">
        <Square value={squares[0]} onSquareClick={() => handleCLick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleCLick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleCLick(2)} />
      </div>

      <div className="boardRow">
        <Square value={squares[3]} onSquareClick={() => handleCLick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleCLick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleCLick(5)} />
      </div>

      <div className="boardRow">
        <Square value={squares[6]} onSquareClick={() => handleCLick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleCLick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleCLick(8)} />
      </div>
    </>
  );

}

function Game() {

  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];//ultima varianta a tablei

  function handlePlay(nextSquares: any) 
  {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>

  );
}

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];//horizontally, vertically, diagonally

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}