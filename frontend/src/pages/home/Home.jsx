
import Navbar from "../../components/navbar/navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Feed from "../../components/feed/Feed.jsx";
import Rightbar from "../../components/rightbar/Rightbar.jsx";
import "./home.css"


const Home = () => {
    return ( 
        <>
        <Navbar />
        <div className="homeContainer">
        <Sidebar />
        <Feed/>
        <Rightbar/>
        </div>
        </>
     );
}
 
export default Home;