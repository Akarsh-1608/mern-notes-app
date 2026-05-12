const Note = require("../models/Note");

const getAllNotes = async (req, res) => {

    try {

        const notes = await Note.find({
            user: req.user.id
        });

        res.json(notes);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getSingleNote = async (req, res) => {

    try {

        const note = await Note.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json(note);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const createNote = async (req, res) => {

    try {

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const newNote = await Note.create({
            title,
            user: req.user.id
        });

        res.status(201).json({
            message: "Note created successfully",
            note: newNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const updateNote = async (req, res) => {

    try {

        const { title } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.id
            },
            {
                title
            },
            {
                new: true
            }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note updated successfully",
            updatedNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const deleteNote = async (req, res) => {

    try {

        const deletedNote = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.json({
            message: "Note deleted successfully",
            deletedNote
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote
};