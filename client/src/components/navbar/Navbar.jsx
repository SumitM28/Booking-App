import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navcontainer">
          <Link to={'/'} style={{color:"inherit",textDecoration:"none"}}>
            <span className="logo">Sumitbooking</span>
          </Link>
            <div className="navItems">
                <button className='navButtons'>Register</button>
                <button className='navButtons'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar