import { useState } from "react"

export default function Register(): JSX.Element {

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    function register() {
        console.log(username, email, password, confirmPassword)
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-200 flex flex-col">
            <h3>Register</h3>
            <input 
                type="text" 
                placeholder="Username" 
                className="p-2 my-2" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            <input 
                type="email" 
                placeholder="Email" 
                className="p-2 my-2" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
            <input 
                type="password" 
                placeholder="Password"
                className="p-2 my-2" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            <input 
                type="password" 
                placeholder="Confirm Password" 
                className="p-2 my-2" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}/>
            <button className="p-2 bg-blue-500 text-white" onClick={register}>Register</button>
        </div>
    )
}

