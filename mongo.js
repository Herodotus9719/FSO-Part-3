const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("give password as argument");
    process.exit(1);
}

const password = process.argv[2];
const terminalName = process.argv[3];
const terminalNumber = process.argv[4];

const url = `mongodb+srv://herodotus9719:${password}@cluster0.fwzwq.mongodb.net/Phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
});

const Person = mongoose.model("Person", personSchema);

if (password && terminalName && terminalNumber) {
    const person = new Person({
        name: terminalName,
        number: terminalNumber,
    });

    person.save().then((result) => {
        console.log(
            `Added ${terminalName}, number ${terminalNumber}, to the Phonebook`
        );
        mongoose.connection.close();
    });
} else if (password) {
    console.log("Phonebook:");
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(`${person.name} ${person.number}`);
        });
        mongoose.connection.close();
    });
}
