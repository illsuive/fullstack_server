import {Link} from 'react-router-dom'
import '../style/signup.css'; 
import { useState  } from 'react';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createUser} from '../../store/userReducer'

const Signup = () => {

  let navigate = useNavigate()
  let dispatch = useDispatch()
  
  
let [User , setUser] = useState({
  name : '',
  email : '',
  password : ''
}) 

let handleSumbit = async() => {
 try {
  let {name , email , password } = User
  if(!name.trim() || !email.trim() || !password.trim()){
    alert('Please fill in all fields.')
  }else{
    await dispatch(createUser(User))
    alert("Account created successfully! You will now be redirected to the login page.")
    navigate('/Login')
  }
 } catch (error) {
    console.log(error);
    alert('Failed! to create User')
 }
}



  return (
    <div className="Sign-container">
      <h1 className="Sign-heading" style={{fontSize : "4rem"}}>Sign Up</h1>
      <form className="Sign-form">
        <input
          type="text"
          placeholder="Name"
          className="Sign-input"
          value={User.name}
          onChange={(e)=> setUser({
            ...User,
            name : e.target.value
          })}
        />
        <input
          type="Email"
          placeholder="Email"
          className="Sign-input"
          value={User.email}
          onChange={(e)=> setUser({
            ...User,
            email : e.target.value
          })}
        />
        <input
          type="password"
          placeholder="Password"
          className="Sign-input"
          value={User.password}
          onChange={(e)=> setUser({
            ...User,
            password : e.target.value
          })}
        />
        <button type="button" onClick={handleSumbit} className="Sign-button">
          Sign Up
        </button>
      </form>
      <p className="Sign-signup-text">
        if you have account ? {' '}
        <a href="/signin" className="Sign-signup-link">
          <Link to={'/Login'}>Login</Link>
        </a>
      </p>
    </div>
  );
};

export default Signup;
