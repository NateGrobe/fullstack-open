import React from 'react'

const ExpandedCountry = ({country}) => {
    return (
        <div>
            <h2>{country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>

            <h3>languages</h3>
            <ul>
                {country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>

            <img alt='flag img' style={{width: '200px', height: '100px'}} src={country.flag} />
        </div>
    )
}

export default ExpandedCountry
