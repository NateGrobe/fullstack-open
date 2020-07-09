import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Nates extra part",
      exerciseCount: 8,
      description: "A fake part made by Nate",
      completionHours: 10
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

const Header: React.FC<{ courseName: string }> = (props) => {
  return (
    <h1>{props.courseName}</h1>
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = (props) => {
  return (
    <div>
      {props.courseParts.map((cp) => <Part key={cp.name} part={cp} />)}
    </div>
  );
};

const Total: React.FC<{ courseParts: CoursePart[] }> = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const Part: React.FC<{ part: CoursePart }> = (props) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p><strong>{props.part.name}</strong> </p>
          <p>exercise count: {props.part.exerciseCount}</p>
          <p>description: {props.part.description}</p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <p><strong>{props.part.name}</strong></p>
          <p>exercise count: {props.part.exerciseCount}</p>
          <p>Group project count: {props.part.groupProjectCount}</p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <p><strong>{props.part.name}</strong></p>
          <p>exercise count: {props.part.exerciseCount}</p>
          <p>description: {props.part.description}</p>
          <p>link: {props.part.exerciseSubmissionLink}</p>
        </div>
      );
    case 'Nates extra part':
      return (
        <div>
          <p><strong>{props.part.name}</strong> </p>
          <p>exercise count: {props.part.exerciseCount}</p>
          <p>description: {props.part.description}</p>
          <p>hours to complete: {props.part.completionHours}</p>
        </div>
      )
    default:
      return assertNever(props.part);
  }
};

// types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CourseDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CourseDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CourseDescription extends CoursePartBase {
  description: string;
}

interface CourseNate extends CourseDescription {
  name: "Nates extra part";
  completionHours: number;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CourseNate;


ReactDOM.render(<App />, document.getElementById('root'));
