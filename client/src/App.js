import axios from "axios"
import { useState } from 'react'
import "./App.css";

function App() {

  const [number, setNumber] = useState(0);
  const [result, setResult] = useState("");
  const [showHint, setShowHint] = useState(false);


  const API_URL = "/api/getResult";
  const IMPUT_LMIT = Math.pow(2, 32);

  const handleClick = (e) => {

    axios.post(API_URL, { number: number })
      .then((res) => {
        const { code, data, msg } = res.data;
        if (code === 0) {
          setResult('[' + data.toString() + ']');
        } else {
          setResult(msg);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div data-testid="app" className="App">
      <header>
        <h2>Input an upper limit number</h2>
        <h2>you will get a median prime number array of the set of prime numbers less than n</h2>
      </header>
      <div id="form">
        <input data-testid="input" id='numberInput' onChange={(event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
          if (event.target.value > IMPUT_LMIT) {
            setNumber(IMPUT_LMIT);
            setShowHint(true);
            return;
          }
          const targetValue = event.target.value;
          event.target.value = targetValue === '' ? 0 : parseInt(event.target.value);
          setNumber(event.target.value);
          setShowHint(false);
          setResult("");
        }} placeholder="please enter a numer..." type="number" value={number} min="1" max="5"></input>
        {
          showHint ? (<p id='hint'>Hint:The input number cannot exceed the 32nd power of 2</p>) : null
        }
        <input data-testid="submit" id='submit' type='submit' onClick={handleClick}></input>
        <div id='result'>
          <span>Result:</span>
          <span>{result}</span>
        </div>
      </div>

    </div >
  );
}

export default App;
