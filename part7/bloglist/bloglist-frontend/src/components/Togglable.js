import React, { useState, useImperativeHandle } from 'react'
import {
  Button
} from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisiblity = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisiblity }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' color='primary' onClick={toggleVisiblity}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button color='primary' variant='contained' onClick={toggleVisiblity}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
