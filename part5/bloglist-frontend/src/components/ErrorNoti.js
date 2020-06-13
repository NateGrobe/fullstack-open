import React from 'react'

const ErrorNoti = ({ message }) => {
  const styles = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if (message === null)
    return null

  return (
    <div id='error' style={styles}>
      {message}
    </div>
  )
}

export default ErrorNoti
