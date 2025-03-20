import React from "react";

const Input = ({ type, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

export default Input;

