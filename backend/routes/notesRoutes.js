const protect = require("../middleware/authMiddleware");
const express = require("express");

const router = express.Router();

const {
    getAllNotes,
    getSingleNote,
    createNote,
    updateNote,
    deleteNote
} = require("../controllers/notesController");

router.get("/", protect, getAllNotes);

router.get("/:id", protect, getSingleNote);

router.post("/", protect, createNote);

router.put("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

module.exports = router;