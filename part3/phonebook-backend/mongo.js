const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const newName = process.argv[3]
const newNum = process.argv[4]

const url = `mongodb+srv://nate_grobe:${password}@cluster0-9wmrj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const genId = () => {
  return Math.floor(Math.random() * 1000)
}
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: Number,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: newName,
  number: newNum,
  id: genId(),
})

if (newName && newNum) {
  person.save().then((res) => {
    console.log(`added ${newName} number ${newNum} to phonebook`)
    mongoose.connection.close()
  })
} else {
  Person.find({}).then((res) => {
    console.log('phonebook:')
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
