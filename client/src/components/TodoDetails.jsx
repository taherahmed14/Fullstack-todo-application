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
        <div className="border-0 border-b border-sky-300 m-auto mt-5 w-80 text-left pb-2">
            <div className="flex">
                <div className={todo.status ? "completed" : "notCompleted"}>
                    <div>Task - {todo.task}</div>
                    <div className="text-xs">Expiry: {todo.expiry[0]} {todo.expiry[1]}</div>
                    <div className="text-xs">Created at: {todo.current}</div>
                    <div className="text-xs">Created by: {user}</div>
                </div>
                <div className="ml-20">
                    <button onClick={() => {handleCompleted(todo._id)}}>
                        <img className="h-8 hover:opacity-50"
                            src="https://img.icons8.com/dotty/80/000000/task-completed.png" alt="completed" />
                    </button>
                    <button onClick={() => {handleDelete(todo._id)}}>
                        <img className="h-8 mb-0.5 hover:opacity-50"
                            src="https://img.icons8.com/wired/64/000000/filled-trash.png" alt="delete" />
                    </button>
                </div>
            </div>
        </div>
    )
};