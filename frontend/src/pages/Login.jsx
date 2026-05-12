import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
function Login() {
    const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [loading, setLoading] = useState(false)
const navigate = useNavigate()
const handleLogin = async () => {

  try {
setLoading(true)
    const response = await axios.post(
      "http://localhost:5000/users/login",
      {
        email,
        password
      }
    )

    localStorage.setItem("token", response.data.token)

   toast.success(response.data.message)
setLoading(false)
    navigate("/dashboard")

  } catch (error) {
setLoading(false)
   toast.error(error.response.data.message)
  }
}
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      
      <div className="bg-zinc-900 p-8 rounded-2xl w-[400px] shadow-2xl">
        
        <h1 className="text-4xl font-bold mb-6 text-center">
          Login
        </h1>

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
  onClick={handleLogin}
  className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
>
  {loading ? "Loading..." : "Login"}
</button>

      </div>

    </div>
  )
}

export default Login
