const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

// custom token
morgan.token('json', (req, res) => {return JSON.stringify(req.body)})

// log tiny if not post
app.use(morgan('tiny', {
    skip: (req, res) => {
        return req.method === 'POST'
    }
}))

// log custom if post
app.use(morgan(':method :url :status :res[content-length] - :total-time ms :json', {
    skip: (req, res) => {
        return req.method !== 'POST'
    }
}))

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person)
                res.json(person.toJSON())
            else
                res.status(404).end()
        })
        .catch(error => next(error))
})

app.get('/info', (req, res) => {
    // not exactly sure if this is correct but it works
    Person.countDocuments({}, (err, count) => {
        if (err)
            res.send(err.message)
        else
            res.send(`Phonebook has info for ${count} people <br> ${new Date()}`)
    })
})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name && !body.number) {
        return res.status(400).json({
            error: 'name and number missing'
        })
    }
    else if (!body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }

    Person.countDocuments({name: body.name}, (err, count) => {
        if (err)
            console.log(err.message)
        else if (count !== 0) {
            return res.status(400).json({
                error: 'name must be unique'
            })
        }
    })

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})

// error handling
const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknownEndpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError')
        return res.status(400).send({error: 'malformatted id'})

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
