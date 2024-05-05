import "./navbar.css"
import {Chat, Notifications, Person, Search} from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext"
const Navbar = () => {

   const {user} = useContext(AuthContext)
   const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return ( 
        <div className="navbarContainer">
           <div className="navbarLeft">
              <Link to="/" style={{textDecoration:"none"}}>
              <span className="logo">SayHi</span>
              </Link>
           </div>
           <div className="navbarMiddle">
              <div className="searchBar">
                <input placeholder="Search Your Friends" className="searchInput" />
                <Search className="searchIcon"/>
              </div>
           </div>
           <div className="navbarRight">
              <div className="navbarLinks">
              <Link to="/" style={{textDecoration:"none"}}>
                 <span className="navbarLink">Home </span>|
               </Link>
               <Link to={`/profile/${user.username}`} style={{textDecoration:"none"}} >
                 <span className="navbarLink"> Profile</span>
               </Link>
              </div>
              <div className="navbarIcons">
                 <div className="navbarIconItems">
                    <Person/>
                     <span className="navbarIconBadge">1</span>
                 </div>
                 <Link to="/chat" style={{textDecoration:"none"}} >
                 <div className="navbarIconItems">
                    <Chat/>
                     <span className="navbarIconBadge">1</span>
                 </div>
              </Link>
                 <div className="navbarIconItems">
                    <Notifications/>
                     <span className="navbarIconBadge">1</span>
                 </div>
              </div>
              <Link to={`/profile/${user.username}`}>
                 
              <img src={user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"}alt="" className="pp" />
              </Link>
           </div>
        </div>
     );
}
 
export default Navbar;