import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { TodoDetails } from "./TodoDetails";
import { Navbar } from "./Navbar";

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
                window.location.href = '/';
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

        alert("Todo added succesfully");
        populateTodo();
    }

    return(
        <>
            <Navbar user={user} />
            <div className="shadow-2xl min-w-0 pb-10 m-auto mt-15">
                <form onSubmit={handleTodo}>
                    <input type="text" placeholder="Enter Todo" onChange={(e) => setTodoTask(e.target.value)}
                        className="border-0 border-b border-sky-500 focus:outline-0 mt-5 px-8 py-2" /> <br />
                    <input type='time' onChange={(e) => setTodoTime(e.target.value)}
                        className="border-0 border-b border-sky-500 focus:outline-0 px-5 py-1 cursor-pointer" />
                    <input type='date' onChange={(e) => setTodoDate(e.target.value)}
                        className="border-0 border-b border-sky-500 focus:outline-0 px-5 py-1 cursor-pointer" />
                    <input type="submit" value="Add"
                        className="border-2 border-sky-500 mt-10 px-5 py-1 cursor-pointer hover:bg-sky-500 mb-5" />
                </form>

                <ul>
                    {todo.map((el => (
                        <TodoDetails setTodo={setTodo} todos={todo} todo={el} user={user} key={el._id} />
                    )))}
                </ul>
            </div>
        </>
    )
};