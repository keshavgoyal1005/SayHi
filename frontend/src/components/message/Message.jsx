import "./message.css"
import {format} from "timeago.js"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Message({message,own}) {
    const [sentBy , setSentBy] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(()=>{
        const senderId = message.sender;
        const getSender = async () =>{
            try{
                const res = await axios("/users?userId=" + senderId);
                setSentBy(res.data);
            }catch(err){
                console.log(err);
            }
        };
        getSender()
    },[message]);
    return (
        <div className={own ? "message own" : "mesaage"}>
            <div className="messageTop">
                <img src={sentBy?.profilePicture ? PF + sentBy.profilePicture : PF + "noAvatar.png"} alt="" className="messageImg" />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )  
}
