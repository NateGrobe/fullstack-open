import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(new Array(props.anecdotes.length).fill(0))

    const addVote = () => {
        const pc = [...points]
        pc[selected] += 1
        setPoints(pc)
    }

    const newSelection = () => {
        while (true) {
            const newSel = Math.floor(Math.random() * 6)
            if (newSel !== selected){
                setSelected(newSel)
                break
            }
        }
    }

    const mostVoted = () => {
        let max = 0
        for (let i = 0; i < points.length; i++){
            if (points[i] > points[max]) {
                max = i
            }
        }
        return max
    }

    return (
        <div>
            <h2>Anecdote of the Day</h2>
            <p>{props.anecdotes[selected]}</p>
            <p>has {points[selected]} votes</p>
            <button onClick={() => addVote()}>vote</button>
            <button onClick={() => newSelection()}>next anecdote</button>
            <h2>Anecdote with most votes</h2>
            <p>{props.anecdotes[mostVoted()]}</p>
            <p>has {points[mostVoted()]} votes</p>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
