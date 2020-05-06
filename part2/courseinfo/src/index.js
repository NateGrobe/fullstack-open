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
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises} />)}
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
    // had to make a change to the file for 2.3
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <div>
            <p><strong>total of {total} exercises</strong></p>
        </div>
    )
}

const Course = ({course}) => {
    
    return (
        <div>
            <Header course={course.name} />            
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const course = {
        id: 1,
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          }
        ]
      }

    return (
        <div>
            <Course course={course} />
        </div>
    )
    
}

ReactDOM.render(<App />, document.getElementById('root'))
