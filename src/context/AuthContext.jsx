import { createContext, useContext, useState, useEffect } from "react";
// import bycrypt from 'bcryptjs';
// import { sign, verify } from 'jsonwebtoken';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);
    const login = (email, password) => {
        if (email === '' && password === '') return {
            status: "failed",
            message: "Please enter email and password"
        }
        let userList = JSON.parse(localStorage.getItem('users'));
        // if already registered
        if (userList) {
            let user = userList.find(user => user.email === email);
            if (user) {
                if (user.password === password) {
                    setUser({ token: email });
                    localStorage.setItem('token', email);
                    navigate('/');
                    return true;
                }
                return {
                    status: "failed",
                    message: "Password is incorrect"
                }
            }
        } else {
            return {
                status: "failed",
                message: "User does not exist"
            }
        }
        setUser({ token: email });
        localStorage.setItem('token', email);
        navigate('/');
        return true;
    }
    const signup = (email, password) => {
        if (email === '' && password === '') return {
            status: "failed",
            message: "Please enter email and password"
        }
        let userList = JSON.parse(localStorage.getItem('users'));
        // if already registered
        if (userList) {
            let user = userList.find(user => user.email === email);
            if (user) {
                return {
                    status: "failed",
                    message: "User already exists"
                }
            }
        }
        let user = {
            email,
            password
        }
        if (!userList) {
            userList = [];
        }
        userList.push(user);
        localStorage.setItem('users', JSON.stringify(userList));
        setUser({ token: email });
        localStorage.setItem('token', email);
        navigate('/');
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
