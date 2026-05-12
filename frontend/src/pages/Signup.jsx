import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
function Signup() {
    const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const handleSignup = async () => {

  try {

    const response = await axios.post(
      "http://localhost:5000/users/signup",
      {
        name,
        email,
        password
      }
    )

    toast.success(response.data.message)

  } catch (error) {

    toast.error(error.response.data.message)
  }
}
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      
      <div className="bg-zinc-900 p-8 rounded-2xl w-[400px] shadow-2xl">
        
        <h1 className="text-4xl font-bold mb-6 text-center">
          Signup
        </h1>

       <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
  className="w-full p-3 mb-4 rounded-lg bg-zinc-800 outline-none"
/>

        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 mb-4 rounded-lg bg-zinc-800 outline-none"
/>

        <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 mb-6 rounded-lg bg-zinc-800 outline-none"
/>

        <button
  onClick={handleSignup}
  className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded-lg font-semibold"
>
  Signup
</button>

      </div>

    </div>
  )
}

export default Signup