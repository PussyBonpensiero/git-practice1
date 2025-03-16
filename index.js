const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("notes.json"));
  res.json(notes);
});

app.post("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("notes.json"));
  const newNote = { id: uuidv4(), text: req.body.text };
  notes.push(newNote);
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
  res.status(201).json(newNote);
});

app.delete("/notes/:id", (req, res) => {
  let notes = JSON.parse(fs.readFileSync("notes.json"));
  notes = notes.filter((note) => note.id !== req.params.id);
  fs.writeFileSync("notes.json", JSON.stringify(notes, null, 2));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
