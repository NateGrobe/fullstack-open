import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
    
    return (
        <div>
            <h2>{course}</h2>            
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
      const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
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
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => <Course key={course.id} course={course} />)}
        </div>
    )
    
}

ReactDOM.render(<App />, document.getElementById('root'))
