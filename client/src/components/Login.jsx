import { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4200/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res.json();
        console.log(data);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
                <input type='submit' value='Login' />
            </form>
        </div>
    )
};