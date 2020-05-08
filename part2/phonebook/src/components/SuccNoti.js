import React from 'react'

const SuccNoti = ({message}) => {
    const styles = {
        color: 'green',
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
        <div style={styles}>
            {message}
        </div>
    )
}

export default SuccNoti
