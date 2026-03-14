import { Link } from "react-router-dom"

export const HomePage = () => {
    return (
        <div>
            <h1>Tasks Page</h1>
            <Link to="/login">Go to Login</Link>
            <Link to="/register">Go to Register</Link>
        </div>
    )
}