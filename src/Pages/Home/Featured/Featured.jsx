import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/assets/home/featured.jpg"
import './featured.css';
const Featured = () => {
    return (
        <div className=" bg-fixed bg-opacity-40  featured-item text-white pt-5">
            <SectionTitle subheading={"check it featured item "} heading={"Featured Item"}></SectionTitle>
            <div className=" md:flex justify-center items-center  py-16 px-20  pt-12 gap-5 "> 
               <div>
               <img src={featuredImg} alt="" />
               </div>
               <div>
                <p> Nov 20, 2023 </p>
                <p> Where can i get some? </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, soluta repellendus. Sint recusandae omnis autem assumenda aperiam, ullam excepturi illo laborum alias consequatur quaerat eum dolores corporis error similique dignissimos nobis! Laboriosam ullam dignissimos praesentium enim alias suscipit earum eum.</p>
                 <button className="btn btn-outline border-0 border-b-4"> Order Now</button>
               </div>
            </div>

        </div>
    );
};

export default Featured;