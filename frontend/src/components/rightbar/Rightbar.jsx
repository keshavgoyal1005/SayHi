import "./rightbar.css"
import { Add, Group, MoreVert, Remove } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
const Rightbar = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; 
  const [friends, setFriends] = useState([]);
  const {user:currentUser , dispatch} = useContext(AuthContext)
  const [followed ,setFollowed] = useState(currentUser.followings.includes(user?.id))
   console.log(currentUser.followings.includes(user?.id));
  // useEffect(()=>{
  //   // setFollowed(currentUser.followings.includes(user?.id))
  //   console.log(followed);
  // },[user])

  useEffect(()=>{
    const getFriends = async () =>{
      try{
        const friendList = await axios.get("/users/friends/" + user._id)
        setFriends(friendList.data)
      }catch(err){
        console.log(err);
      }
    }
    getFriends();
  }, [user])
    const handleFollow = async () =>{
      try{
          if(followed) {
            await axios.put("/users/" + user._id + "/unfollow" ,{userId:currentUser._id})
            dispatch({type:"UNFOLLOW", payload:user._id})
          }else{
            await axios.put("/users/" + user._id + "/follow" ,{userId:currentUser._id})
            dispatch({type:"FOLLOW", payload:user._id})
          }

          setFollowed(!followed)
      }catch(err){
        console.log(err);
      }
    }
    const HomeRightbar = ( ) =>{
           return(
               <>
               <div className="birthdayContainer">
                    <img src="/assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>John </b> and <b>3 others</b> have a birthday today.
                    </span>
                </div>
                <div className="friendRequest">
                    <div className="friendRequestTop">
                   <div className="friendRequestTopLeft">
                   <Group htmlColor="blue"/> 
                    <span className="friendRequestText">Friend Request</span>
                   </div>
                    <MoreVert/>
                    </div>
                    <div className="friendRequestBottom">
                    <img src="/assets/profile/1.jpg" alt="" className="friendRequestImg" />
                    <span className="friendRequestName">Jane</span>
                    </div>
                    <div className="butn">
                    <button className="btn confrm">Confirm</button>
                    <button className="btn dlt">Delete</button>
                    </div>
                </div>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {/* {User.map(u=>(
                        <Online key={u.id} user={u}/>
                    ))} */}
                    <li className="rightbarFriend">
                        <div className="rightbarImgContainer">
                            <img src="/assets/profile/1.jpg" alt="" className="rightbarImg" />
                            <span className="online"></span>
                        </div>
                        <span className="Username">John Carter</span>
                    </li>
                    
                </ul>
               </>
           )
    }
    const ProfileRightbar = () =>{
        return(
            <>
            {user.username !== currentUser.username && (
               <button className="rightbarFollowButton" onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove/> : <Add />}
               </button>
            ) }
            <div className="bioInfo">
            <h4 className="bioTitle">User Information</h4>
            <hr />
            <div className="bioInfoItem">
                <span className="bioInfoItemKey">City:</span>
                <span className="bioInfoItemValue">{user.city}</span>
            </div>
            <div className="bioInfoItem">
                <span className="bioInfoItemKey">Birthday:</span>
                <span className="bioInfoItemValue">16 February 2001</span>
            </div>
            <div className="bioInfoItem">
                <span className="bioInfoItemKey">Followers:</span>
                <span className="bioInfoItemValue">230</span>
            </div>
            <div className="bioInfoItem">
                <span className="bioInfoItemKey">Following:</span>
                <span className="bioInfoItemValue">250</span>
            </div>
            </div>
            <h4 className="rightbarTitle">Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) =>(
            <Link to={"/profile/" + friend.username} style={{textDecoration:"none"}}>
               <div className="rightbarFollowing">
            <img
             src={
               friend.profilePicture
             ? PF + friend.profilePicture
             : PF + "noAvatar.png"}

             alt=""
             className="rightbarFollowingImg"
           />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
            </Link>
          ))}
          
           
          </div>
            </>
        )
    }
    return ( 
        <div className="rightbar">
            <div className="rightbarWrapper">
                 {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
     );
}
 
export default Rightbar;