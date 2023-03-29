import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


import '../../App.css'

const Header = () => {


  const { cartItems } = useSelector(state => state.cart)

  return (
    <Fragment>
      <nav className="navbar row">
        <div className="col-12 col-md-3">
          <div className="navbar-brand">
            <Link to="/"> <img src="/images/shopit_logo.png" /> </Link>
          </div>
        </div>

        <div className="col-12 col-md-6 mt-2 mt-md-0">
                    
                </div>

        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        
        <Link to="/" className="btn ml-4" id="login_btn">Home</Link>
          <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>

          <Link to="/cart" style={{ textDecoration: 'none' }} >
            <span id="cart" className="ml-3">Cart</span>
            <span className="ml-1" id="cart_count">{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </Fragment>
  )


}

export default Header
