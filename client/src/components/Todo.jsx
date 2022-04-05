import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { TodoDetails } from "./TodoDetails";

export const Todo = () => {
    const [user, setUser] = useState("");
    const [todo, setTodo] = useState([]);
    const [todoTask, setTodoTask] = useState("");
    const [todoTime, setTodoTime] = useState("");
    const [todoDate, setTodoDate] = useState("");

    async function populateTodo() {
        const res = await fetch("http://localhost:4200/todo", {
            headers: {
                "x-access-token": localStorage.getItem('token'),
            }
        })

        const data = await res.json();
        if(data.status === "ok") {
            console.log(data.user.username);
            setUser(data.user.username);
            setTodo(data.todo);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        if(token) {
            const decoded = jwt_decode(token);
            console.log(decoded);

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

        let tempTodo = {
            task: todoTask,
            current: new Date(),
            expiry: [todoDate, todoTime],
            status: false,
        };
        let addedTodo = [...todo, tempTodo]

        const res = await fetch("http://localhost:4200/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                todo: addedTodo,
            })
        })

        const data = await res.json();
        alert("Todo added successfully");
    
        setTodo(addedTodo);
        setTodoTask("");
        setTodoDate("");
        setTodoTime("");
        
    }

    return(
        <div>
            <form onSubmit={handleTodo}>
                <input type="text" placeholder="Enter Todo" onChange={(e) => setTodoTask(e.target.value)} />
                <input type='time' className="todoTime" onChange={(e) => setTodoTime(e.target.value)} />
                <input type='date' className="todoTime" onChange={(e) => setTodoDate(e.target.value)} />
                <input type="submit" value="Submit" />
            </form>

            <ul>
                {todo.map((el => (
                    <TodoDetails setTodo={setTodo} todos={todo} todo={el} user={user} key={el._id} />
                )))}
            </ul>
        </div>
    )
};