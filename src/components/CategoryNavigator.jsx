import React from 'react'
import { Link } from 'react-router-dom'

const CategoryNavigator = ({ name, slug }) => {
    return (
        <Link to={`/category/${slug}`} className="flex items-center space-x-2 hover:text-[#0336A6]" >
            <h2 className="text-2xl font-bold mb-4">{name}{" >"}</h2>
        </Link >
    )
}

export default CategoryNavigator
