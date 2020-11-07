import { useEffect, useState } from 'react'
import Logo from '../images/Logo.svg'
import { NavLink, Link } from 'react-router-dom'
import useAuth from './hooks/useAuth'
import { auth } from "../config/firebase"

function Navbar() {

  const { user, profileImage, userLoggedIn } = useAuth()
  const [navbar, setNavbar] = useState (false)

  const hamburger = () => {
    setNavbar(!navbar)
  }
 const logout = () => {
  auth.signOut()
  window.location.href= "/"
 }
  return (
    <header>  
      <div className="logo"><Link to="/"><img src={Logo} alt="logo" /></Link> </div>
          { 
            userLoggedIn ? 
            (
              <div className="nav">
              <p><Link to="/userprofile" style={{textDecoration: "none"}}><img src={ profileImage }/><span>{user.displayName}</span></Link></p>
                <ul className={navbar ? "navbar active": "navbar"}>          
                  <li className="logged-in"><NavLink exact={true} to="/home"><i className="fas fa-home"></i></NavLink></li>
                  <li className="logged-in"><NavLink to="/userprofile"><i className="fas fa-cog"></i></NavLink></li>
                  <li className="logged-in" onClick={logout}>Logout</li>
                </ul>
            </div>
            )
            :
            (
              <div className="nav">
                <ul className={navbar ? "navbar active": "navbar"}>
                  <li className="signin-list"><NavLink to="/" style={{ textDecoration: 'none' }}>Sign in </NavLink></li>
                  <li className="signup-list"><NavLink to="/signup"  style={{ textDecoration: 'none'}} >Sign up</NavLink> </li>
    
                </ul>
              </div>
            )
          }
        <div className="hamburger" onClick={hamburger}><i className="fas fa-bars"></i></div>
      
    </header>
  );
}

export default Navbar;
