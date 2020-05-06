import React from 'react'

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    name: <input value={props.newNameVal} onChange={props.onNameChange} />
                </div>
                <div>
                    number: <input value={props.newNumVal} onChange={props.onNumChange} /> 
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm
