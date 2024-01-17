import React from 'react';

const Header2  = ({name}) => {
    return <h2>{name}</h2>
}
  
const Part = ({part}) => {
    return <p>{part.name} {part.exercises} </p>
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map((part) => 
                < Part key={part.id} part={part}/>
            )}
        </div>
    )
}
  
const Total = ({parts}) => {
    const sum = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p><b>total of {sum} exercises</b></p>
}
  
const Course = ({course}) => {
    console.log({course})
    return (
      <div>
        <Header2 name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course;