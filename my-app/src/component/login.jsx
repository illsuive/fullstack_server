import {Link , useNavigate} from 'react-router-dom'
import '../style/login.css'; 
import {useEffect, useState} from 'react'
import {useDispatch, useSelector } from 'react-redux'
import {LoginUser} from '../../store/userReducer'

const Login = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let token = useSelector((state)=>state.user.token)
  let [user , setUser]= useState({
    email : '',
    password : ''
  })

let handleClick = async()=> {
  try {
    let {email , password } = user
    if(!email.trim() && !password.trim()){
        alert('Please fill in all fields.')
    }else{
      let User = await dispatch(LoginUser(user))
      if(User.error){
          return alert("Invalid! credentials")
      }else{
        setUser({
          email : "",
          password : ''
        })
        alert("Login successful!")
        navigate('/Feed')
      }
    }  
  } catch (error) {
    console.log(error);
  }
}


  useEffect(()=>{
    if(!token){
      navigate('/Login')
    }
  },[navigate , token])

  return (
    <div className="login-container">
      <h1 className="login-heading" style={{fontSize : "4rem"}}>Login</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={user.email}
          onInput={(e)=> setUser({
            ...user,
            email : e.target.value
          })}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={user.password}
          onInput={(e)=> setUser({
            ...user,
            password: e.target.value
          })}
        />
        <button type="button" onClick={handleClick} className="login-button">
          Login
        </button>
      </form>
      <p className="login-signup-text">
        Don't have an account?{' '}
        <a href="/signin" className="login-signup-link">
         <Link to={'/Signup'}>Sign Up</Link>
        </a>
      </p>
    </div>
  );
};

export default Login;
