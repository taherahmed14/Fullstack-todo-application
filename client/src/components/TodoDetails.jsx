export const TodoDetails = ({ setTodo, todos, todo, user }) => {

    const handleCompleted = async (id) => {

        const updatedTodo = todos.map((el) => {
            if(el._id === id) {
                el.status = !el.status;
            }
            return el;
        });

        const res = await fetch("http://localhost:4200/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                todo: updatedTodo,
            })
        })

        const data = await res.json();
        setTodo(updatedTodo);
    };

    const handleDelete = async (id) => {

        const updatedTodo = todos.filter((el) => {
            if(el._id !== id) {
                return el;
            }
        });

        const res = await fetch("http://localhost:4200/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem('token'),
            },
            body: JSON.stringify({
                todo: updatedTodo,
            })
        })

        const data = await res.json();
        alert("Todo Deleted successfully");
        setTodo(updatedTodo);
    };

    return (
        <div>
            <div className='todo'>
                <div className={todo.status ? "completed" : "notCompleted"}>
                    <div>{todo.task}</div>
                    <div className="dateandtime">Expiry: {todo.expiry[0]} {todo.expiry[1]}</div>
                    <div className="dateandtime">Created at: {todo.current}</div>
                    <div className="dateandtime">Created by: {user}</div>
                </div>
                <div>
                    <button onClick={() => {handleCompleted(todo._id)}}>
                        <img src="https://img.icons8.com/dotty/80/000000/task-completed.png" alt="completed" />
                    </button>
                    <button onClick={() => {handleDelete(todo._id)}}>
                        <img src="https://img.icons8.com/wired/64/000000/filled-trash.png" alt="delete" />
                    </button>
                </div>
            </div>
        </div>
    )
};