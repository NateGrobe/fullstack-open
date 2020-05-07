import React, {useState} from 'react'
import ExpandedCountry from './ExpandedCountry'

const Country = ({country}) => {
    const [expanded, setExpanded] = useState(false)
    
    return (
        <div>
            <div style={{display : expanded ? 'none' : 'block'}}>
                {country.name}
                <button onClick={() => setExpanded(!expanded)}>show</button>
            </div>
            <div style={{display : expanded ? 'block' : 'none'}}>
                <ExpandedCountry country={country} />
                <button onClick={() => setExpanded(!expanded)}>hide</button>
            </div>
        </div>
    )
}

export default Country
