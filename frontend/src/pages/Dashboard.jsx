import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {

    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")

    const token = localStorage.getItem("token")

    const fetchNotes = async () => {

        try {

            const response = await axios.get(
                "https://notes-backend-rppw.onrender.com/notes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setNotes(response.data)

        } catch (error) {

            console.log(error)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])
    const createNote = async () => {

        try {

            await axios.post(
                "https://notes-backend-rppw.onrender.com/notes",
                {
                    title
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setTitle("")

            fetchNotes()

        } catch (error) {

            console.log(error)
        }
    }
    const deleteNote = async (id) => {

        try {

            await axios.delete(
                `https://notes-backend-rppw.onrender.com/notes/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            fetchNotes()

        } catch (error) {

            console.log(error)
        }
    }
    const handleLogout = () => {

        localStorage.removeItem("token")

        window.location.href = "/login"
    }
    return (
       <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">

  <div>

    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
      Notes App
    </h1>

    <p className="text-zinc-400 mt-2">
      Organize your thoughts beautifully 🚀
    </p>

  </div>

  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 transition px-5 py-3 rounded-2xl font-semibold shadow-lg"
  >
    Logout
  </button>

</div>
            <h1 className="text-5xl font-bold mb-10">
                Dashboard 🚀
            </h1>
            <div className="flex flex-col md:flex-row gap-4 mb-12">

  <input
    type="text"
    placeholder="Write a new note..."
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="flex-1 p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 outline-none focus:border-blue-500 transition text-lg"
  />

  <button
    onClick={createNote}
    className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-2xl font-bold shadow-xl"
  >
    Add Note
  </button>

</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {notes.length === 0 ? (

    <div className="text-zinc-500 text-xl">
      No notes yet. Create your first note ✨
    </div>

  ) : (

    notes.map((note) => (

      <div
        key={note._id}
        className="bg-zinc-900/80 backdrop-blur-lg border border-zinc-800 p-6 rounded-3xl shadow-2xl hover:scale-105 hover:border-blue-500 transition duration-300"
      >

        <h2 className="text-2xl font-bold mb-4 break-words">
          {note.title}
        </h2>

        <button
          onClick={() => deleteNote(note._id)}
          className="mt-2 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl"
        >
          Delete
        </button>

      </div>

    ))

  )}

</div>

        </div>
    )
}

export default Dashboard