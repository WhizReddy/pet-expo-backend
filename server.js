const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const animals = { cats: [], dogs: [], birds: [] };

app.use(bodyParser.json());
app.use(cors());

app.post("/animals/:type", (req, res) => {
  const { type } = req.params;
  const animal = req.body;
  animal.id = Date.now();
  animals[type].push(animal);
  res.status(201).send(animal);
});

app.get("/animals/:type", (req, res) => {
  const { type } = req.params;
  res.send(animals[type]);
});

app.put("/animals/:type/:id", (req, res) => {
  const { type, id } = req.params;
  const animal = req.body;
  const index = animals[type].findIndex((a) => a.id == id);
  if (index !== -1) {
    animals[type][index] = { ...animal, id: parseInt(id) };
    res.send(animals[type][index]);
  } else {
    res.status(404).send({ message: "Animal not found" });
  }
});

app.delete("/animals/:type/:id", (req, res) => {
  const { type, id } = req.params;
  const index = animals[type].findIndex((a) => a.id == id);
  if (index !== -1) {
    animals[type].splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Animal not found" });
  }
});

app.get("/animals/:type/search", (req, res) => {
  const { type } = req.params;
  const { name } = req.query;
  const result = animals[type].filter((a) =>
    a.name.toLowerCase().includes(name.toLowerCase())
  );
  res.send(result);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
