import { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4200/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        const data = await res.json();
        if(data.status === "ok") {
            window.location.href = "/";
        }
        else {
            alert("Please check email and password");
        }
    }

    return (
        <div className="shadow-2xl min-w-0 h-96 m-auto mt-20">
            <h1 className="text-3xl pt-5">Create your account</h1>
            <form onSubmit={handleRegister}>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}
                    className="border-0 border-b border-sky-500 focus:outline-0 mt-5 px-8 py-2" /> <br />
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} 
                    className="border-0 border-b border-sky-500 focus:outline-0 mt-5 px-8 py-2"/> <br />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} 
                    className="border-0 border-b border-sky-500 focus:outline-0 mt-5 px-8 py-2"/> <br />
                <input type='submit' value='Register'
                    className="border-2 border-sky-500 mt-10 px-8 py-2 cursor-pointer hover:bg-sky-500" />
            </form>
            <Link to={"/"} className="text-sky-500 hover:text-sky-300">Sign in Instead</Link>
        </div>
    )
};