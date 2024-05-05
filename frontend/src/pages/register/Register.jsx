import axios from "axios"
import {Link} from "react-router-dom"
import { useRef } from "react"
import "./register.css"
import {useHistory } from "react-router"

export default function Register() {
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordConfirm = useRef()
    const history = useHistory()

    const handleClick = async (e) =>{
        e.preventDefault();
        if(passwordConfirm.current.value !== password.current.value)
        passwordConfirm.current.setCustomValidity("Passwords Don't Match")
        else {
            const user = {
                username: username.current.value,
                email:email.current.value,
                password:password.current.value
            }
            try{
               const res = await axios.post("/auth/signup" , user)
                 history.push("/login")
            }catch(err){
                 console.log(err);
            }
        }
    }

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
                        <input placeholder="Username"  ref={username} required className="loginInput" />
                        <input placeholder="Email" type="email" ref={email} required  className="loginInput" />
                        <input placeholder="Password" type="password" minLength="6" ref={password} required  className="loginInput" />
                        <input placeholder="Confirm Password" type="password" ref={passwordConfirm} required  className="loginInput" />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <div className="bot">
                        <Link to="/login">
                        <button className="loginRegisterButton">Log Into Your Account</button>
                        </Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}
