import { useNavigate } from "react-router-dom"

function App() {

  const navigate = useNavigate()

  return (
    <>
      <h1
        className="text-4xl text-center text-blue-500"
      >oky</h1>

      <button
        className="bg-black"
        onClick={() => {
          localStorage.clear()
          navigate('/login')
        }}
      >logout</button>
    </>
  )
}

export default App
