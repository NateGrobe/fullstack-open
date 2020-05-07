import React, {useState, useEffect} from 'react'
import axios from 'axios'
import ExpandedCountry from './components/ExpandedCountry'
import Country from './components/Country'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(res => {
                setCountries(res.data)
            })
    }, [])

    const handleFilter = (event) => setFilter(event.target.value) 
    const filteredCountries = countries.filter(country => country.name.toUpperCase().includes(filter.toUpperCase()))
    
    return (
        <div>
            find countries <input value={filter} onChange={handleFilter} />
            <p style={{display: filteredCountries.length < 11 ? 'none' : 'block'}}>Too many matches, specify another filter</p>

            <div style={{display: filteredCountries.length < 11 ? 'block' : 'none'}}>
                {filteredCountries.length !== 1 
                    ? filteredCountries.map(country => <Country key={country.name} country={country} />)
                    : filteredCountries.map(country => <ExpandedCountry key={country.name} country={country} />)
                }
            </div>

        </div>
    )
}

export default App
