import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);

    const authLinks = (
        <>
            <li><span>Hello, {user && user.name}</span></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><a href="#!" onClick={logout}>Logout</a></li>
        </>
    );

    const guestLinks = (
        <>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-lg">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">TaskManager</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/">Home</Link></li>
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </div>
    );
};

export default Navbar; 