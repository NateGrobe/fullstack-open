import React, {useState, useEffect} from 'react'
import personServices from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import SuccNoti from './components/SuccNoti'
import ErrorNoti from './components/ErrorNoti'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [succMessage, setSuccMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        personServices
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    },[])

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }

        const match = persons.find(person => person.name === newName)

        if (!match) {
            personServices
                .create(personObject)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    setSuccMessage(`Added ${newName}`)
                    setTimeout(() => {
                        setSuccMessage(null)
                    }, 5000)
                })
            setNewName('')
            setNewNumber('')
        } else if (match.number !== newNumber) {
            const confirmed = window.confirm(
            `${newName} is already added to the phonebook, replace the old number with a new on ?`
            )

            if (confirmed) {
                personServices
                    .changeNumber(match.id, personObject)
                    .then(changedPerson => {
                        setPersons(persons.map(person => person.id !== match.id ? person : changedPerson))
                        setSuccMessage(`${newName}'s number has been changed to ${newNumber}`)
                        setTimeout(() => {
                            setSuccMessage(null)
                        }, 5000)
                    })
                    .catch(error => {
                        setErrorMessage(
                            `Information of ${newName} has already been removed from server`
                        )
                        setTimeout(() => {
                            setErrorMessage(null)
                        }, 5000)
                    })
                setNewName('')
                setNewNumber('')
            }
        } else {
            setNewName('')
            setNewNumber('')
            alert(`${newName} is already added to the phonebook`)
        }
    }

    const deletePerson = personData => {
        const confirm = window.confirm(`Delete ${personData.name}?`)
        if (confirm) {
            personServices
                .remove(personData.id)
            setSuccMessage(`${personData.name} has been removed from the phonebook`)
            setTimeout(() => {
                setSuccMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== personData.id))
        }
    }

    const filteredNames = persons.filter(person => person.name.toUpperCase().includes(filter.toUpperCase()))
    
    const handleNameChange = (event) => setNewName(event.target.value) 
    const handleNumberChange = (event) => setNewNumber(event.target.value) 
    const handleFilter = (event) => setFilter(event.target.value) 

    return (
        <div>
            <h2>Phonebook</h2>
            <SuccNoti message={succMessage} />
            <ErrorNoti message={errorMessage} />
            <Filter value={filter} onChange={handleFilter} />

            <h2>Add a new</h2>
            <PersonForm onSubmit={addPerson} 
                newNameVal={newName} onNameChange={handleNameChange} 
                newNumVal={newNumber} onNumChange={handleNumberChange}
            />

            <h2>Numbers</h2>
            {filteredNames.map(person => <Person key={person.name} person={person} handleClick={() => deletePerson(person)} />)}
        </div>
    )
}

export default App
