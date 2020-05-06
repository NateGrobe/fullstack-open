import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    
    return (
        <div>
            <h1>{course}</h1>            
        </div>
    )
}

const Content = ({parts}) => {
    console.log(parts[0])
    return (
        <div>
            <Part part={parts[0].name} exercise={parts[0].exercises} />
            <Part part={parts[1].name} exercise={parts[1].exercises} />
            <Part part={parts[2].name} exercise={parts[2].exercises} />
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

const Total = ({parts}) => {
    return (
        <div>
            <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
        </div>
    )
}



const App = () => {
    const course = 'Half Stack application development'
      const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
      }
      const part2 = {
        name: 'Using props to pass data',
        exercises: 7
      }
      const part3 = {
        name: 'State of a component',
        exercises: 14
      }

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} />
            <Total parts={[part1, part2, part3]} />
        </div>
    )
    
}

ReactDOM.render(<App />, document.getElementById('root'))
