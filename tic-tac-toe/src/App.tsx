import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;

function Square({ value, onSquareClick }: any) {

  return (
    <button
      className="square" onClick={onSquareClick}>
      {value}
    </button>

  );
}

function Board() {

  const [xIsNext, setXIsNext] = useState(true); //remember turns
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleCLick(i: any) {
    //if there is already a value in the square, stop. dont overwrite it
    if (squares[i] || calculateWinner(squares))
    return;

    const nextSquares = squares.slice();
    
    xIsNext ? nextSquares[i] = "X" : nextSquares[i] = "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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

function calculateWinner(squares: any) 
{
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

  for (let i = 0; i < lines.length; i++) 
  {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}