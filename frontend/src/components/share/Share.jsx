import "./share.css"
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"

const Share = () => {
    const {user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
     const desc = useRef()
     const [file,setFile] = useState(null)

     const submitHandler= async(e) =>{
         e.preventDefault()
         const newPost = {
             userId: user._id,
             desc: desc.current.value
         }
         if(file){
             const data = new FormData()
            //  const fileName = Date.now() + file.name
             data.append("file",file)
             data.append("name",file.name)
            //  newPost.img = fileName
             newPost.img = file.name
             try{
               await axios.post("/upload", data)
             }catch(err){
                 console.log(err);
             }
         }
         try{
             await axios.post("/posts",newPost)
             window.location.reload()
         }catch(err){

         }
     }
    return ( 
        <div className="share">
           <div className="shareWrapper">
               <div className="shareTop">
               <img className="shareProfileImg" src={user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"} alt="" />
               <input placeholder={"Hey how's your day, " + user.username+"?"} className="shareInput" 
               ref={desc}/>
               </div> 
               <hr className="shareHr" />
               { file && (
                   <div className="shareImgContainer">
                       <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                       <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
                   </div>
               )}
               <form className="shareBottom" onSubmit={submitHandler}>
                   <label htmlFor="file" className="shareOptions">
                       <PermMedia htmlColor="tomato" className="shareIcon"/>
                       <span className="shareOptionText">Photo/Video</span>
                       <input 
                       style={{display:"none"}}
                       type="file" 
                       id="file" 
                       accept=".png,.jpeg,.jpg" 
                       onChange ={(e)=>setFile(e.target.files[0])}
                       />

                   </label>
                   <div  className="shareOptions">
                       <Label htmlColor="blue" className="shareIcon"/>
                       <span className="shareOptionText">Tag</span>

                   </div>
                   <div   className="shareOptions">
                       <Room htmlColor="green" className="shareIcon"/>
                       <span className="shareOptionText">Location</span>

                   </div>
                   <div className="shareOptions">
                       <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                       <span className="shareOptionText">Feelings/Activity</span>

                   </div>
                   
               <button className="shareButton" type="submit">Share</button>
               </form>
           </div>
        </div>
     );
}
 
export default Share;