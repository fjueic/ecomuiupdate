import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Acc = () => {
    const { user, logout } = useAuth();
    return (
        <>
            {user ?
                <button className="cursor-pointer font-bold" onClick={logout}>Logout</button> :
                <Link to="/login">Log in</Link>
            }
        </>

    )
}

export default Acc
