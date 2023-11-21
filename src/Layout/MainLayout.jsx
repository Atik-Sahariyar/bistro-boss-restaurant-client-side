import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";


const MainLayout = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
            { isLogin ||  <NavBar></NavBar>}
            <Outlet></Outlet>
            { isLogin || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;