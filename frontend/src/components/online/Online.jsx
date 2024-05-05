import axios from "axios";
import { useEffect, useState } from "react"
import "./online.css"

export default function Online({onlineUsers, currentId, setCurrentChat}) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    useEffect(() =>{
        const getFriends = async () =>{
            const res = await axios.get("/users/friends/" + currentId);
            setFriends(res.data)
        }

        getFriends();
    },[currentId])

    useEffect(()=>{
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
        
    },[friends,onlineUsers])
    // console.log(onlineFriends);

    const handleClick = async( user) =>{
      try{
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data)
      }catch(err){
        console.log(err);
      }
    }
    

    return(
        <div className="chatOnline">
          {onlineFriends.map((o) => (
            <div className="rightbarFriend" onClick={()=>
              handleClick(o)
            }>
              <div className="rightbarImgContainer">
                <img
                  className="OnlineImg"
                  src={
                    o?.profilePicture
                      ? PF + o.profilePicture
                      : PF + "noAvatar.png"
                  }
                  alt=""
                />
                <div className="onlineFriends"></div>
              </div>
              <span className="Username">{o?.username}</span>
            </div>
          ))}
        </div>
      );
                }