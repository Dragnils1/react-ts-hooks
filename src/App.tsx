import React, { useCallback, useEffect, useState } from 'react';
import User from './components/User';
import Admin from "./components/Admin";
import Counter from "./components/Counter";
import './App.css';
import { color } from './color';
import { Context } from './components/Context';

function App() {

  const [hi, setHi] = useState("Good day, doesn't it ?")
  const [date, setDate] = useState<string | null>(null)
  const pureChange = useCallback(()=> {
    changeHi()
  }, [hi])

  const changeHi = (): void => {
    let rand = Math.floor(Math.random() * (5 - 1 + 1)) + 1
    if (rand < 2) {
      setHi('How are you? ✨')
    } else if (rand > 4) {
      setHi("Exalant day for you 🤞")
    } else {
      setHi("Good day, doesn't it ?")
    }
  }

  useEffect(() => {
    changeDate()
  }, [date])

  const changeDate = (): void => {
    setDate(new Date().toLocaleString())
  }

  return (
    <div className="App">
      Now: {date}
      <header className="App-header">
        <Context.Provider value={color.dark}>
          <User hiChange={pureChange} children={<><hr/><h2 style={{ background: 'red' }}>{hi}</h2><hr/></>} />
          <Counter />
          <Admin />
        </Context.Provider>
      </header>
    </div>
  );
}

export default App;
