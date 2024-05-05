import "./login.css"
import { useContext, useRef } from "react"
import {Link} from "react-router-dom"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import {CircularProgress} from '@material-ui/core';

export default function Login() {
    const email = useRef()
    const password = useRef()
    const {user,isFetching, error, dispatch} = useContext(AuthContext)
    const handleClick = (e) =>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
    }
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">SayHi</h3>
                    <span className="loginDesc">
                        Connect with your friends on SayHi...
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" className="loginInput" required ref={email}/>
                        <input placeholder="Password" minLength="6" type="password" className="loginInput" required ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/> : "Log In"}</button>
                        <span className="loginForgot">Forgot Password</span>
                        <div className="bot">
                        <Link to="/">
                        <button className="loginRegisterButton">{isFetching ? <CircularProgress color="white" size="20px"/> : "Create A New Account"}</button>
                        </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
