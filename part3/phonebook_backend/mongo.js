const mongoose = require("mongoose");

// node mongo.js <password> [name] [number]

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://maria8link_db_user:${password}@cluster0.icd0xfs.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

async function main() {
  try {
    await mongoose.connect(url, { family: 4 });

    // Только пароль → вывести все записи
    if (process.argv.length === 3) {
      const persons = await Person.find({});
      console.log("phonebook:");
      persons.forEach((p) => {
        console.log(`${p.name} ${p.number}`);
      });
    }

    // Пароль + имя + номер → добавить запись
    else if (process.argv.length === 5) {
      const name = process.argv[3];
      const number = process.argv[4];

      const person = new Person({ name, number });
      await person.save();
      console.log(`added ${name} number ${number} to phonebook`);
    }

    // Неправильное число аргументов
    else {
      console.log("Usage:");
      console.log("  node mongo.js <password>");
      console.log('  node mongo.js <password> "<name>" <number>');
    }
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await mongoose.connection.close();
  }
}

main();
