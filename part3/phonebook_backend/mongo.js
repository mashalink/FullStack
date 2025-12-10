const mongoose = require('mongoose')

// node mongo.js <password> [name] [number]

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://maria8link_db_user:${password}@cluster0.icd0xfs.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minlength: [8, 'Number must be at least 8 characters long'],
    required: [true, 'Number is required'],
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message:
        'Number must be in the form XX-XXXXXXX or XXX-XXXXXXX (only digits and one dash)',
    },
  },
})

const Person = mongoose.model('Person', personSchema)

async function main() {
  try {
    await mongoose.connect(url, { family: 4 })

    if (process.argv.length === 3) {
      const persons = await Person.find({})
      console.log('phonebook:')
      persons.forEach((p) => {
        console.log(`${p.name} ${p.number}`)
      })
    } else if (process.argv.length === 5) {
      const name = process.argv[3]
      const number = process.argv[4]

      const person = new Person({ name, number })
      await person.save()
      console.log(`added ${name} number ${number} to phonebook`)
    } else {
      console.log('Usage:')
      console.log('  node mongo.js <password>')
      console.log('  node mongo.js <password> "<name>" <number>')
    }
  } catch (error) {
    console.error('Error:', error.message)
  } finally {
    await mongoose.connection.close()
  }
}

main()
