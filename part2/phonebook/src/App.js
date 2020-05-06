import React, {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')

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
