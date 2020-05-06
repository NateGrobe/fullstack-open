import React from 'react'

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

export default Course
