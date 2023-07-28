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

function Square() {

  const [value,setValue]=useState(String);
  
    function handleClick() {
      setValue('X');
    }
  
    return (
      <button 
      className="square" 
      onClick={handleClick}
      >
        {value}
        </button>
  
    );
  }
  
  function Board() {
    return (
      <>
        <div className="boardRow">
          <Square />
          <Square />
          <Square />
        </div>
  
        <div className="boardRow">
          <Square />
          <Square />
          <Square />
        </div>
  
        <div className="boardRow">
          <Square />
          <Square />
          <Square />
        </div>
      </>
    );
  }