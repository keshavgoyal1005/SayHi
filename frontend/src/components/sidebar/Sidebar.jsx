import "./sidebar.css"
import {Bookmark, Chat, Group, PlayCircleFilledOutlined, RssFeed, GroupsOutlined,Flag,AccessTime} from "@mui/icons-material"

const Sidebar = () => {
    return (  
        <div className="sidebar">
           <div className="sidebarWrapper">
               <ul className="sidebarlist">
                   <li className="sidebarListItem">
                       <RssFeed className="sidebarIcon"/>
                       <span className="sidebarListItemText">Feed</span>
                   </li>
                   <li className="sidebarListItem">
                       <Chat className="sidebarIcon"/>
                       <span className="sidebarListItemText">Chats</span>
                   </li>
                   <li className="sidebarListItem">
                       <Group className="sidebarIcon"/>
                       <span className="sidebarListItemText">Groups</span>
                   </li>
                   <li className="sidebarListItem">
                       <GroupsOutlined className="sidebarIcon"/>
                       <span className="sidebarListItemText">Friends</span>
                   </li>
                   <li className="sidebarListItem">
                       <PlayCircleFilledOutlined className="sidebarIcon"/>
                       <span className="sidebarListItemText">Videos</span>
                   </li>
                   <li className="sidebarListItem">
                       <Flag className="sidebarIcon"/>
                       <span className="sidebarListItemText">Pages</span>
                   </li>
                   <li className="sidebarListItem">
                       <Bookmark className="sidebarIcon"/>
                       <span className="sidebarListItemText">Bookmarks</span>
                   </li>
                   <li className="sidebarListItem">
                       <AccessTime className="sidebarIcon"/>
                       <span className="sidebarListItemText">Memories</span>
                   </li>
               </ul>
               <hr classsName="sidebarHr"/>
               <ul className="sidebarfriendlist">
                   {/* Users.map(u =>(
                       <CloseFriend key="u.id" user={u}/>
                   )) */}
                  <li className="sidebarFriend">
                      <img src="/assets/profile/1.jpg" alt="" className="sidebarFriendImg" />
                      <span className="sidebarFriendName">Jane</span>
                  </li>
                  
               </ul>
           </div>
        </div>
    );
}
 
export default Sidebar;