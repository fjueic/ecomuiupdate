import './App.css'
import { registerSW } from 'virtual:pwa-register'
import NavBar from './components/NavBar'
import { Routes, Route } from "react-router-dom"
import Login from './components/Login'
import Signup from './components/SignUp'
import Home from './components/Home'
import Product from './components/Product'
import Cart from './components/Cart'
import CategoryProducts from './components/CategoryProducts'
import Catagories from './components/Categories'
registerSW({ immediate: true })


function App() {

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/categories" element={<Catagories />} />
                <Route path="/category/:slug" element={<CategoryProducts />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<div className="text-center text-2xl" > 404 Not Found</div>} />
            </Routes>
        </>
    )
}

export default App
