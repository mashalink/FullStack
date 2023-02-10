import { useState } from 'react'

const Header  = ({header}) => {
  console.log({header})
  return (
    <h1>{header}</h1>
  )
}

const Button = ({handleClick, text}) => {
  console.log({text})
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const StatisticLine = ({counter, text}) => {
  console.log({counter, text})
  return (
    <td>{text} {counter}</td>
  )
}

const Statistics = ({good, neutral, bad}) => {
  console.log({good, neutral, bad})
  const all = good + neutral + bad;

  if (all === 0) {
    return <p>No feedback given</p>
  }

  const average = (good - bad) / all;
  const positive = good / all * 100 + ' %';

  return (
    <table>
      <tbody>
        <tr><StatisticLine counter={good} text={"good"}/></tr>
        <tr><StatisticLine counter={neutral} text={"neutral"}/></tr>
        <tr><StatisticLine counter={bad} text="bad"/></tr>
        <tr><StatisticLine counter={all} text="all"/></tr>
        <tr><StatisticLine counter={average} text="average"/></tr>
        <tr><StatisticLine counter={positive} text="positive"/></tr>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header={"give feedback"} />
      <Button handleClick={() => setGood(good + 1)} text={"good"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} text={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} text={"bad"}/>
      <Header header={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App