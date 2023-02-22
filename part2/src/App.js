const Header  = ({name}) => (<h1>{name}</h1>)

const Part = ({name, exercises}) => (<p>{name} {exercises} </p>)

const Content = ({parts}) => {
  console.log({parts})
  return (
    <div>
      < Part name={parts[0].name} exercises={parts[0].exercises} />
      < Part name={parts[1].name} exercises={parts[1].exercises} />
      < Part name={parts[2].name} exercises={parts[2].exercises} />
      < Part name={parts[3].name} exercises={parts[3].exercises} />
    </div>
  )
}

const Total = ({parts}) => {
  const sum = parts.reduce(function(sum, part) 
  {
    console.log ('Sum =', sum, 'will add', part.exercises)
    return sum + part.exercises
  }, 0);
  console.log ('Sum =', sum)
  return <p><b>total of {sum} exercises</b></p>
}

const Course = ({course}) => {
  console.log({course})
  return (
    <div>
      <Header name={course.name} />
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
      ,
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App
