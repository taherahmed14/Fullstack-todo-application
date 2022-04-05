

export const Navbar = ({ user }) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div className="overflow-hidden bg-sky-500">
            <div className="float-left px-5 py-3">Hi {user}</div>
            <div className="float-right px-5 py-3 cursor-pointer hover:opacity-50" onClick={handleLogout}>Logout</div>
        </div>
    )
};