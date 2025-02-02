const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

morgan.token("content", (req) => JSON.stringify(req.body));
app.use(cors());

// Rendering the frontend if it exists in dist folder:
app.use(express.static("dist"));

app.use(express.json());
app.use(
    morgan(
        ":method :url :status :res[content-length] - :response-time ms :content"
    )
);

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: "2",
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: "3",
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: "4",
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/", (request, response) => {
    response.send("<h1>Welcome to the backend</h1>");
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/info", (request, response) => {
    const message = `Phonebook has info for ${persons.length} people.
    <br />
    <br />
    ${new Date()}
    `;
    response.send(message);
});

app.get("/api/persons/:id", (request, response) => {
    const personId = request.params.id;
    const personToReturn = persons.find((person) => person.id === personId);
    if (personToReturn) {
        response.json(personToReturn);
    } else {
        response.status(404).end();
    }
});

app.delete("/api/persons/:id", (request, response) => {
    const personId = request.params.id;
    persons = persons.filter((person) => person.id !== personId);

    response.status(204).end();
});

const newId = () => {
    const newId = Math.trunc(Math.random() * 10 ** 8);
    return String(newId);
};

app.post("/api/persons", (request, response) => {
    const body = request.body;
    const condition = persons.some((person) => person.name === body.name);

    if (!body.name) {
        return response.status(400).json({
            error: "name missing",
        });
    } else if (!body.number) {
        return response.status(400).json({
            error: "number missing",
        });
    } else if (condition) {
        return response.status(400).json({
            error: "name must be unique",
        });
    }

    const person = {
        id: newId(),
        name: body.name,
        number: body.number,
    };

    persons = persons.concat(person);

    response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
