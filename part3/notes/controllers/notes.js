const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user")

notesRouter.get("/", async (_request, response) => {
  const notes = await Note.find({}).populate("user", { username: 1, name: 1 })
  response.json(notes);
});


notesRouter.get("/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.delete("/:id", async (request, response, next) => {

  try {
    await Note.findByIdAndRemove(request.params.id)
    response.status(204).end();
  } catch (error) {
    next(error)
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;
  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user._id
  });

  try {
    const savedNote = await note.save();
    response.json(savedNote);
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
  
  } catch (error) {
    next(error);
  }
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAnfdUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
