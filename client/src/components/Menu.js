import React, { useState, useEffect } from "react";
import { NavLink, withRouter, useHistory } from 'react-router-dom'
import '../styles/menu.css'
import { FaBars, FaTimes } from "react-icons/fa";
//import logo from '../img/logo.webp'
import {RiKnifeFill } from 'react-icons/ri'
import { isAuthenticated, signout } from "../api/authApi";




const Menu = () => {
  const [menu, setMenu] = useState(false);
  const [click, setClick] = useState(false);

  const history = useHistory()

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarBackgroundColor);
  }, []);

  const changeNavbarBackgroundColor = () => {
    // console.log(window.scrollY)
    if (window.scrollY >= 80) {
      setMenu(true);
    } else {
      setMenu(false);
    }
  };



  


  return (
    <div>
     <nav className={menu ? "menu change" : "menu"}>
      <div className="navbar-container menu-box">
        <NavLink to="/" className="navbar-logo" onClick={closeMobileMenu}>
        {/* <img src={logo} alt="logo" />  */}
        best <RiKnifeFill/> meat
        </NavLink>

        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
            <div className="box1">
                <li className="nav-item">
            <NavLink to="/" className="nav-links" activeClassName="is-active" onClick={closeMobileMenu}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="is-active"
              to="/menu"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Menu
            </NavLink>
          </li> 
          <li className="nav-item">
            <NavLink
              to="/update-products" activeClassName="is-active"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              update products
            </NavLink>
          </li> 
          <li className="nav-item">
            <NavLink
              to="/profile"
              className="nav-links" activeClassName="is-active"
              onClick={closeMobileMenu}
            >
             
            </NavLink>
          </li> 

           
            </div>
         
            
          <div className="box2">
          <li className="nav-item">
            <NavLink activeClassName="is-active"
              to="/profile"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              profile
            </NavLink>

          </li>

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <> 
              <li className="nav-item">
          <NavLink to="/admin/dashboard" activeClassName="is-active" className="nav-links" onClick={closeMobileMenu}>
              admin dashboard
            </NavLink>
          </li>
              </>
            )}
         

          {!isAuthenticated() && (
            <>
             <li className="nav-item">
            <NavLink activeClassName="is-active"
              to="/signup"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              SIGN UP
            </NavLink>

          </li>
          <li className="nav-item">
          <NavLink to="/signin" className="nav-links" activeClassName="is-active" onClick={closeMobileMenu}>
              SIGN IN
            </NavLink>
          </li>
            </>
          )}
             
             
          


          {isAuthenticated() && (
            <li className='nav-item'>
              <NavLink className="btn btn-signout" activeClassName="is-active"
              to='/signout'
              onClick={()=> signout(() =>{
                history.push('/')
            })}
              > 
                 sign out
              </NavLink>
            </li>
            )}
          </div>
          
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default withRouter(Menu)