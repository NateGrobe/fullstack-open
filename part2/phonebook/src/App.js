import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(res => {
                setPersons(res.data)
            })
    }, [])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.find(person => person.name === newName))
            alert(`${newName} is already in the phonebook`)
        else
            setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const filteredNames = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    
    const handleNameChange = (event) => setNewName(event.target.value) 
    const handleNumberChange = (event) => setNewNumber(event.target.value) 
    const handleFilter = (event) => setFilter(event.target.value) 

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filter} onChange={handleFilter} />

            <h2>Add a new</h2>
            <PersonForm onSubmit={addPerson} 
                newNameVal={newName} onNameChange={handleNameChange} 
                newNumVal={newNumber} onNumChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            <Persons persons={filteredNames} />
        </div>
    )
}

export default App
