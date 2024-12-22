import { Link, Outlet } from "react-router-dom"
import { useState } from "react"

export default function Signup(): JSX.Element {

    const [email, setEmail] = useState<string>('')

    return (
        <>
            <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col gap-36 rounded-xl w-2/4 h-64 text-white items-center justify-center">

                <img 
                    src="./favicon.png" 
                    alt="liham icon"
                    className="w-36 h-36"/>

                <form
                    className="flex flex-col gap-4 items-center justify-center">
                    <label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-black p-2 rounded-lg border-2 border-black"
                            placeholder="Email"
                            type="email"/>
                    </label>
                    <Link to="verification"
                        className="bg-primary rounded-lg text-black w-fit h-fit">
                        Confirm
                    </Link>
                </form>
            </div>
            <Outlet/>
        </>
    )
}

