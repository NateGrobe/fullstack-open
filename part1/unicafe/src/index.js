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
                <Statistic text='good' value={good} />
                <Statistic text='neutral' value={neutral} />
                <Statistic text='bad' value={bad} />
                <Statistic text='all' value={all} />
                <Statistic text='average' value={avg} />
                <Statistic text='positive' value={pos} />
            </div>
        )
    }
    
}

const Statistic = ({text, value}) => (
        <div>
            {text} {value}{text === 'positive' ? '%' : ''}
        </div>
)

const Button = ({handleClick, text}) => (
        <button onClick={handleClick}> {text} </button>
)

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
                <Button handleClick={() => incrementGood(good + 1)} text='good' />
                <Button handleClick={() => incrementNeutral(neutral + 1)} text='neutral' />
                <Button handleClick={() => incrementBad(bad + 1)} text='bad' />
            </span>

            <h2>statistics</h2>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
