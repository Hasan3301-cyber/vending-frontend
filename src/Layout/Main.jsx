import { Outlet, useLocation } from "react-router-dom"
import Footer from "../pages/Shared/footer/Footer"
import NavBar from "../pages/Shared/NavBar/NavBar"


const Main = () => {
  const location =useLocation();
  const noHead= location.pathname.includes('login')||location.pathname.includes('signup')|| location.pathname.includes('ask')||location.pathname.includes('menu');
  return (
    <div>
     {noHead||<NavBar></NavBar> } 
     <Outlet></Outlet> 
     {noHead||<Footer></Footer>}
    </div>
  )
}

export default Main
