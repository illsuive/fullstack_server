import '../../src/App.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiInstagramFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FcFilmReel } from "react-icons/fc";
import {Link ,useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux';
import { logout } from '../../store/userReducer'
// let token = localStorage.getItem("authToken")
 const Header = () => {
  let navigate = useNavigate()
  // let {token , username } = useSelector((state)=> state.user)
  let token = localStorage.getItem(`${import.meta.env.VITE_JWT}`)
  let username = localStorage.getItem(`${import.meta.env.VITE_USERNAME}`)
 
  
  let dispatch = useDispatch()




  let logOut = () =>{
    dispatch(logout())
    navigate("/Login")
  }


  return (
    <div>
    <Navbar expand="lg" bg="dark" className="bg-body-tertiary" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand style={{fontSize : '3rem'}}><Link to={'/'}><RiInstagramFill/></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link   style={{fontSize : '1.2rem'}}> <Link to={'/'}><FaHome/> Home</Link></Nav.Link>
            <Nav.Link   style={{fontSize : '1.2rem'}}> <Link to={'/Feed'}><FcFilmReel />Feed</Link></Nav.Link>
          </Nav>    
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            { token ? <Nav.Link  style={{fontSize : '1.2rem' }} type='button'>Welcome , @{username}</Nav.Link> : "" }
          </Nav>
        </Navbar.Collapse>

            
            {
            token ? 
            <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  style={{fontSize : '1.2rem'}} onClick={logOut} >Log out</Nav.Link> </Nav> :
            <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  style={{fontSize : '1.2rem'}}><Link to={'/Signup'}>Sign Up</Link></Nav.Link>
             <Nav.Link  style={{fontSize : '1.2rem'}}><Link to={'/Login'}>Log in</Link></Nav.Link>
             </Nav>
             }
          
      </Container>
    </Navbar>
    </div>
  )
}

export default Header