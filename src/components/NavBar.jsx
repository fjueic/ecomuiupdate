import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Store } from "lucide-react";
import CartLogo from "./CartLogo";
import Acc from "./Acc";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="flex sticky top-0 bg-[#0336A6] w-full h-16 shadow-md text-white justify-between items-center text-lg z-50 px-4 md:px-8 lg:px-16">

            <Link to="/" className="flex items-center space-x-2">
                <Store />
                <span className="font-bold text-xl hover:text-gray-200 transition-colors">
                    NOVAMART
                </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 font-bold">
                <Link to="/" className="hover:text-gray-200 transition-colors text-xl">Home</Link>
                <Link to="#" className="hover:text-gray-200 transition-colors text-xl">Shop</Link>
                <Link to="/categories" className="hover:text-gray-200 transition-colors text-xl">Categories</Link>
                <Link to="#" className="hover:text-gray-200 transition-colors text-xl">Deals</Link>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden block text-white"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* User & Cart */}
            <div className="hidden md:flex items-center gap-6">
                <Acc />
                <CartLogo />
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-blue-700 flex flex-col items-center space-y-4 py-4 md:hidden font-bold">
                    <Link to="/" className="hover:text-gray-200 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/shop" className="hover:text-gray-200 transition-colors" onClick={() => setMenuOpen(false)}>Shop</Link>
                    <Link to="/categories" className="hover:text-gray-200 transition-colors" onClick={() => setMenuOpen(false)}>Categories</Link>
                    <Link to="/deals" className="hover:text-gray-200 transition-colors" onClick={() => setMenuOpen(false)}>Deals</Link>
                    <Acc />
                    <CartLogo />
                </div>
            )}
        </nav>
    );
};

export default NavBar;

