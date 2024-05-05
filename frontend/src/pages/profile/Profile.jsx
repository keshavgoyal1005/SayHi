import Navbar from "../../components/navbar/navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./profile.css"
import { useState,useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router"

export default function Profile() {
    const [user , setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () => {
            
            const res = await axios.get(`/users?username=${username}`) 
            setUser(res.data)
        }
          fetchUser();
        }, [username])
    return (
        <>
        <Navbar />
        <div className="profile">
        <Sidebar />
        <div className="profileRight">
              <div className="profileRightTop">
                  <div className="profileCover">
                  <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "noCover.png"} alt="" />
                  {/* <div className="profilePicAdd" >
                      <div>Click to add pic
                          </div>  */}
                  <img className="profilePic" src={user.profilePicture ? PF + user.profilePicture : PF + "noAvatar.png"} alt="" />
                  {/* </div> */}
                  </div>
                  <div className="profileInfo"> 
                      <h4 className="profileName">{user.username}</h4>
                      <span className="profileDescp">{user.descp}</span>
                  </div>
                  
              </div>
              <div className="profileRightBottom">
              <Feed username={username}/>
              <Rightbar user={user}/>
              </div>
        </div>
        </div>
        </>
    )
}


