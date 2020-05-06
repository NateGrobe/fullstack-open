import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    
    return (
        <div>
            <h1>{course}</h1>            
        </div>
    )
}

const Content = ({parts, exercises}) => {
    return (
        <div>
            <Part part={parts[0]} exercise={exercises[0]} />
            <Part part={parts[1]} exercise={exercises[1]} />
            <Part part={parts[2]} exercise={exercises[2]} />
        </div>
    )
}

const Part = ({part, exercise}) => {
    return (
        <div>
            <p>{part} {exercise}</p>
        </div>
    )
}

const Total = ({exercises}) => {
    return (
        <div>
            <p>Number of exercises {exercises[0] + exercises[1] + exercises[2]}</p>
        </div>
    )
}



const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises2 = 10
    const part2 = 'Using props to pass data'
    const exercises1 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} exercises={[exercises1, exercises2, exercises3]}/>
            <Total exercises={[exercises1, exercises2, exercises3]} />
        </div>
    )
    
}

ReactDOM.render(<App />, document.getElementById('root'))
