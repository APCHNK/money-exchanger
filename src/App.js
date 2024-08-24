import { useState } from 'react';
import './App.css';

const App = () => {
  const [value, setValue] = useState(1)
  const [isResult, setIsResult] = useState(false)
  const [result, setResult] = useState(0)

  
  function getCurrencyBid (currency) {
    fetch(`https://api.nbp.pl/api/exchangerates/rates/c/${currency}/`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        setResult(() => {
          let res = 0
          res = (value / data.rates[0].bid).toFixed(2)
          if (result) {
            setIsResult(true)
          }
          return res;
        })
    })
  }

  function onChanging (event) {
    setValue(event.target.value)
    setIsResult(false)
  }

  return (
    <div class="app">
      <div class="counter"><input onChange={(event) => onChanging(event)} type="number" value={value} /></div>
      <div class="controls">
        in
        <button onClick={(event) => {getCurrencyBid(event.target.getAttribute('data-currency'))}} data-currency={'usd'}>USD</button>
        <button onClick={(event) => {getCurrencyBid(event.target.getAttribute('data-currency'))}} data-currency={'eur'}>EURO</button>
      </div>
      {isResult ? <Result result = {result} /> : null}
    </div>
  )
}


const Result = (props) => {
  return(
    <>
      <div className="block">
        Result is {props.result}
      </div>
    </>
  )
}

export default App;
