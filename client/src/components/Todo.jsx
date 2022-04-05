import { useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const Todo = () => {

    const [todo, setTodo] = useState("");
    const [tempTodo, setTempTodo] = useState("");

    async function populateTodo() {
        const res = await fetch("http://localhost:4200/todo", {
            headers: {
                "x-access-token": localStorage.getItem('token'),
            }
        })

        const data = await res.json();
        if(data.status === "ok") {
            console.log(data);
            setTodo(data.todo);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token) {
            const decoded = jwt_decode(token);
            console.log(decoded);
            //const user = jwt.decode(token);
            if(!decoded) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            else {
                populateTodo();
            }
        }
    }, []);

    const handleTodo = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:4200/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                todo: tempTodo,
            })
        })

        const data = await res.json();
    
        if(data.status === "ok") {
            setTodo(tempTodo);
            setTempTodo("");
        }
    }

    return(
        <div>
            <h1>{todo ? todo : "No Todo added"}</h1>
            <form onSubmit={handleTodo}>
                <input type="text" placeholder="Enter Todo" value={tempTodo} onChange={(e) => setTempTodo(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
};