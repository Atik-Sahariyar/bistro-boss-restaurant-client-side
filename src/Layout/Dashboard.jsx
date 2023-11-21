import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaPhone, FaSearch, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";


const Dashboard = () => {
    const [cart] = useCart();
    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div className="flex">
            <div className=" w-64  min-h-screen bg-orange-400 ">
                <ul className=" p-4">
                    {
                        isAdmin ? <>
                            {/* admin routes */}
                            <li>
                                <NavLink to="/dashboard/adminHome"> <span className=" flex gap-2 my-3 items-center"><FaHome></FaHome><span>Admin Home</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/add-items"> <span className=" flex gap-2 my-3  items-center"><FaUtensils></FaUtensils><span>Add Items</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-items"> <span className=" flex gap-2 my-3  items-center"><FaList></FaList><span>Manage Items</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manage-bookings"> <span className=" flex gap-2 my-3  items-center"><FaBook></FaBook><span>Manage Bookings</span></span> </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/all-users"> <span className=" flex gap-2 my-3  items-center"><FaUser></FaUser><span>All Users </span></span> </NavLink>
                            </li>
                    
                        </>
                            :
                    
                            <>
                            {/* user routes */}
                                <li>
                                    <NavLink to="/dashboard/userHome"> <span className=" flex gap-2 my-3 items-center"><FaHome></FaHome><span>User Home</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation"> <span className=" flex gap-2 my-3 items-center"><FaCalendar></FaCalendar><span>Reservation</span></span> </NavLink>
                                </li>
            
                                <li>
                                    <NavLink to="/dashboard/my-cart"> <span className=" flex gap-2 my-3 items-center"><FaShoppingCart></FaShoppingCart><span>My cart ({cart.length})</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review"> <span className=" flex gap-2 my-3 items-center"><FaAd></FaAd><span>Add Review</span></span> </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/paymentHistory"> <span className=" flex gap-2 my-3 items-center"><FaList></FaList><span> Payment History</span></span> </NavLink>
                                </li>
                            </>
                    }


                    {/* Shaered Navlink */}
                    <div className=" divider"></div>
                    <li>
                        <NavLink to="/"> <span className=" flex gap-2 my-3 items-center"><FaHome></FaHome><span>Home</span></span> </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"> <span className=" flex gap-2 my-3 items-center"><FaSearch></FaSearch><span>Menu</span></span> </NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact"> <span className=" flex gap-2 my-3 items-center"><FaPhone></FaPhone><span>Contact</span></span> </NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;