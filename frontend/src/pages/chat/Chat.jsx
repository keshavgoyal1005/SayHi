
import { useContext, useState, useEffect, useRef } from "react"
import Conversation from "../../components/conversation/Conversation"
import Message from "../../components/message/Message"
import Navbar from "../../components/navbar/navbar"
import { AuthContext } from "../../context/AuthContext"
import "./chat.css"
import axios from "axios"
import { io } from "socket.io-client";
import Online from "../../components/online/Online"

export default function Chat() {
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const socket = useRef()
    const [newMessage, setNewMessage] = useState(null)
    const [onlineUsers , setOnlineUsers] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState("")
    const { user } = useContext(AuthContext)
    const scrollRef = useRef()

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
          setArrivalMessage({
            sender: data.senderId,
            text: data.text,
            createdAt: Date.now(),
          });
        });
      }, []);

    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
          setOnlineUsers(user.followings.filter((f)=> users.some((u) => u.userId === (f))))
 
        });
      }, [user._id]);

    useEffect(()=>{
        const getConversations = async () =>{
            try{
                const res = await axios.get("/conversations/" + user._id)
                setConversations(res.data);
            }catch(err){
                console.log(err);
            }
        }
        getConversations()
    },[user])

    useEffect(() => {
        const getMessages = async () =>{
            try{
                const res = await axios.get("/messages/" + currentChat?._id)
                setMessages(res.data)
            }catch(err){
                console.log(err);
            }
        }
        getMessages()
    },[currentChat])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messages])

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
          sender: user._id,
          text: newMessage,
          conversationId: currentChat._id,
        };
    
        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );
    
        socket.current.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          text: newMessage,
        });
    
        try {
          const res = await axios.post("/messages", message);
          setMessages([...messages, res.data]);
          setNewMessage("");
        } catch (err) {
          console.log(err);
        }
      };
    
    

    
    return (
        <>
        <Navbar/>
        <div className="chat">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                   <input placeholder="Search For Friends" className="chatMenuInput" />
                  {conversations.map((c) => (
                      <div onClick={() => setCurrentChat(c)}>

                          <Conversation conversation={c} currentUser={user}/>
                      </div>
                  ))}
                </div>
            </div>   
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ? 
                <>
                <div className="chatBoxTop">
                    {messages.map((m)=>(
                     <div ref={scrollRef}>

                         <Message message={m} own={m.sender === user._id}/>
                     </div>
                    ))}
                    
                </div>
                <div className="chatBoxBottom">
                    <textarea placeholder="Say Hi..." 
                    onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chatMessageInput"></textarea>
                    <button className="chatSend" onClick={handleSubmit}>Send</button>
                </div> </> : <span className="noConversation"> CHOOSE A CONVERSATION TO <i className="italic">"SAY HI"</i> </span>}
            </div>
        </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                <Online onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                </div>
            </div>
        </div>
        </>
    )
}
