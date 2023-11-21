import { useState } from "react";
import orderCoverImg from "../../../assets/assets/shop/banner2.jpg"
import Cover from "../../Shared/Cover/Cover";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from "../../../Hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks' ]
    const { category } = useParams();
    const initialINdex = categories.indexOf(category);
    const [ tabeIndex, setTabIndex] = useState(initialINdex);
    const [ menu ] = useMenu();

    const desserts = menu?.filter(item => item.category === 'dessert');
    const soup     = menu?.filter(item => item.category === 'soup');
    const salad    = menu?.filter(item => item.category === 'salad');
    const pizza    = menu?.filter(item => item.category === 'pizza');
    const dirnks   = menu?.filter(item => item.category === 'drinks');

    return (
        <div>
          <Helmet><title>Bistro Boss | Orer Food</title></Helmet>

            <Cover img={orderCoverImg} title={"Order Food"}></Cover>
            <Tabs defaultIndex={tabeIndex} onSelect={(index) => setTabIndex(index)}>
                 <div className=" flex justify-center my-10">
                 <TabList>
                    <Tab>Salad</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Soups</Tab>
                    <Tab>Desserts</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                 </div>
                <TabPanel>
                  <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab items={dirnks}></OrderTab>
                </TabPanel>
            
            </Tabs>
        </div>
    );
};

export default Order;