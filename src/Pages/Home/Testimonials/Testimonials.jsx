import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
import axios from "axios";
import { Rating }  from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css';

const Testimonials = () => {
   const [reviews, setReviews] = useState();

   useEffect(() => {
        try{
           axios('http://localhost:5000/reviews')
           .then(res => {
            const data = res.data;
            setReviews(data)
           })
        } catch(error) {
            console.log(error);
        }

   }, [])
 
    return (
        <section className=" my-16 ">
            <SectionTitle 
            subheading={"What Our Client say"}
            heading={"Testimonials"}
            >
            </SectionTitle>
            <Swiper navigation ={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews?.map(review => <SwiperSlide
                    key={review._id}
                    >
                     <div className="flex flex-col items-center m-20">
                       <div className="">
                       <Rating
                        style={{ maxWidth: 180 }}
                        value={review.rating}
                        readOnly
                        className=" w-8 " 
                        >
                        </Rating>
                       </div>
                      
                        <p>{review.details}</p>
                        <h3 className="  text-2xl text-orange-400 ">{review.name}</h3>
                     </div>
                    </SwiperSlide>
                    )
                }
                
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Testimonials;