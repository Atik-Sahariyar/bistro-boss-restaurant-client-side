import { Helmet } from "react-helmet-async";
import menuImg from "../../../assets/assets/menu/banner3.jpg"
import dessertImg from "../../../assets/assets/menu/dessert-bg.jpeg"
import pizzatImg from "../../../assets/assets/menu/pizza-bg.jpg"
import saladImg from "../../../assets/assets/menu/salad-bg.jpg"
import souptImg from "../../../assets/assets/menu/soup-bg.jpg"
import Cover from "../../Shared/Cover/Cover";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

const Menu = () => {
    const [ menu ] = useMenu();
    const desserts = menu?.filter(item => item.category === 'dessert');
    const soup = menu?.filter(item => item.category === 'soup');
    const salad = menu?.filter(item => item.category === 'salad');
    const pizza = menu?.filter(item => item.category === 'pizza');
    const offered = menu?.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet><title>Bistro Boss | Menu</title></Helmet>
           
            <Cover img={menuImg} title = "our menu"></Cover>

            {/* main cover */}
            <SectionTitle subheading={"Don't miss todays offer"} heading={"Todays offer"}></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* desserts menu items */}
            <MenuCategory items={desserts}coverImg={dessertImg} title={"Dessert"} ></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} coverImg={pizzatImg} title={"Pizza"} ></MenuCategory>
            {/* salad menu items */}
            <MenuCategory items={salad} coverImg={saladImg} title={"salad"} ></MenuCategory>
            {/* soup menu items */}
            <MenuCategory items={soup} coverImg={souptImg} title={"soup"} ></MenuCategory>
        
        
        </div>
    );
};

export default Menu;