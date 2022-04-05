import { useState } from "react";

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
        console.log(data);
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} /> <br />
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <input type='submit' value='Register' />
            </form>
        </div>
    )
};