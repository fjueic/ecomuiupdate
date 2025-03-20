import React from 'react'

const Button = ({ children, type, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-[#0336A6] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
            {children}
        </button>

    )
}

export default Button
