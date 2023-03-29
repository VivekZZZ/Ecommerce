
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from './components/Home';
import { useEffect, useState } from 'react';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
import Footer from './components/layout/Footer'
import Login from "./components/login/login"
import ConfirmOrder from './components/cart/ConfirmOrder';
import Register from "./components/register/register"

import './App.css';

function App() {

  const [user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  const updateUser = (user) => {
    localStorage.setItem("MyUser", JSON.stringify(user))
    setLoginUser(user)
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>

          <Route exact path="/" element={<Home />} />
            <Route path="/product/:_id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
