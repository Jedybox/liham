import { useState } from "react"

export default function Login(): JSX.Element {
    
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    
    function login() {
        console.log(username, password)
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-200 flex flex-col">
            <h3>Login</h3>
            <input 
                type="text" 
                placeholder="Username" 
                className="p-2 my-2" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            <input 
                type="password" 
                placeholder="Password"
                className="p-2 my-2" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
            <button className="p-2 bg-blue-500 text-white" onClick={login}>Login</button>
        </div>
    )

}