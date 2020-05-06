import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad
    const avg = (good - bad) / all
    const pos = good / all * 100

    if (all === 0) {
        return ( <p>No feedback given</p>)
    } else {
        return (
            <div>
                <p>good {good}</p>
                <p>neutral {neutral}</p>
                <p>bad {bad}</p>
                <p>all {all}</p>
                <p>average {avg}</p>
                <p>positive {pos}%</p>
            </div>
        )
    }
    
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incrementGood = newValue => setGood(newValue)
    const incrementNeutral = newValue => setNeutral(newValue)
    const incrementBad = newValue => setBad(newValue)


    return (
        <div>
            <h2>give feedback</h2>
            <span>
                <button onClick={() => incrementGood(good + 1)}>good</button>
                <button onClick={() => incrementNeutral(neutral + 1)}>neutral</button>
                <button onClick={() => incrementBad(bad + 1)}>bad</button>
            </span>

            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
