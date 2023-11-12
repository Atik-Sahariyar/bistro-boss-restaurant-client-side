import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import axios from "axios";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
    const [ menu, setMenu ] = useState()
    useEffect(() => {
        try{
            axios('../../../../public/menu.json')
            .then(res => {
                const data = res.data;
                const pupularItems = data?.filter(item => item.category === 'popular');
                setMenu(pupularItems)
            }) 
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <section className=" mb-6">
            <SectionTitle 
            heading={"From Our Menu"}
            subheading={"Popular Items"}
            ></SectionTitle>
            <div className=" grid  grid-cols-1 md:grid-cols-2 gap-5">
                {
                    menu?.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="flex justify-center">
            <button className="btn btn-outline border-0 border-b-4"> View Full Menu</button>

            </div>
        </section>
    );
};

export default PopularMenu;