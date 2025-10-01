import { useState,useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import Profile from "../components/Profile";
import UpdateProfile from "../components/UpdateProfile";
import Review from "../components/Review";
import { useNavigate } from "react-router-dom";
import videoFile from '../assets/video.mp4';


export default function Dashboard() {

  const [auth,setAuth] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message,setMessage] = useState('');
  const [userData,setUserData] = useState(null);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(()=>{
    axios.get('http://localhost:8081/auth/dashboard')
    .then((res) => {
        
        if(res.data.Status === "Success"){
            setAuth(true);
            console.log(res.data.user);
            setUserData(res.data.user);
        }
        else{
            setAuth(false);
            setMessage(res.data.Error);
        }
    })
    .catch((err) => console.log(err));
},[])

  
const handleLogout = () => {
  axios.delete('http://localhost:8081/auth/logout')
  .then(res => {
     navigate('/');
  })
  .catch(err => console.log(err));
}

  const handleMenuClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false); // Close sidebar on small screens
  };

  const handleLogin = () =>{
    navigate('/login');
  }

  return (
   <div>
    {
      auth ?
       <div className="flex h-screen">
       {/* Sidebar */}
       <div
         className={`fixed md:relative z-50 bg-gray-800 text-white w-64 p-5 transition-transform ${
           sidebarOpen ? "translate-x-0" : "-translate-x-full"
         } md:translate-x-0`}
       >
         <div className="flex justify-between items-center mb-5">
           <h2 className="text-xl font-bold">Hi👋 {userData.name}</h2>
           <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
             <X size={24} />
           </button>
         </div>
         <ul>
           <li
             className={`p-2 cursor-pointer ${
               activeTab === "dashboard" ? "bg-gray-700" : ""
             }`}
             onClick={() => handleMenuClick("dashboard")}
           >
             Product Simulation
           </li>
           <li
             className={`p-2 cursor-pointer ${
               activeTab === "profile" ? "bg-gray-700" : ""
             }`}
             onClick={() => handleMenuClick("profile")}
           >
             Profile
           </li>
           <li
             className={`p-2 cursor-pointer ${
               activeTab === "updateProfile" ? "bg-gray-700" : ""
             }`}
             onClick={() => handleMenuClick("updateProfile")}
           >
             Update Profile
           </li>
           <li className={`p-2 cursor-pointer ${activeTab === "review" ? "bg-gray-700" : ""}`} onClick={() => handleMenuClick("review")}>
             Review
           </li>
           {/* Horizontal Line */}
           <hr className="my-3 border-gray-600" />
           <li className="p-2 cursor-pointer text-red-500" onClick={handleLogout}>
             Sign Out
           </li>
         </ul>
       </div>
 
       {/* Main Content */}
       <div className="flex-1 p-5 overflow-auto">
         {/* Hamburger Menu (only on small screens) */}
         <button
           className="md:hidden mb-4 bg-gray-800 text-white p-2 rounded"
           onClick={() => setSidebarOpen(!sidebarOpen)}
         >
           <Menu size={24} />
         </button>
 
         {activeTab === "dashboard" && (
           <div className="w-full h-full bg-gray-100 flex items-center justify-center">
             <video
               src={videoFile}
               className="w-full h-full object-cover"
               controls
             ></video>
           </div>
         )}
         {activeTab === "profile" && <Profile userData={userData} />}
         {activeTab === "updateProfile" && <UpdateProfile userData={userData} setUserData={setUserData}/>}
         {activeTab === "review" && <Review name = {userData.name} />}
       </div>
     </div>
     :
     <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
     <h1 className="text-red-600 text-2xl font-semibold bg-red-100 border border-red-400 px-4 py-2 rounded-md shadow-md">
       You are not authenticated
     </h1>
     <button 
       onClick={handleLogin} 
       className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all"
     >
       Login
     </button>
   </div>
      
    }
   </div>
  );
}
