import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils } from "react-icons/fa";


const UpdateItem = () => {
    // const {_id, name, recipe, category, price, image} = useLoaderData();
    const  item  = useLoaderData();
    console.log(item);
    const {_id, name, recipe, category, price} = item;
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const onSubmit = async (data) => {
        const imageFiile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFiile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const menuItem = {
                name: data?.name,
                category: data?.category,
                price: parseFloat(data?.price),
                recipe: data?.recipe,
                image: res.data.data.display_url
            }

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} updeted`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }

        }
    }

    return (
        <div>
            <SectionTitle heading={'update an item'} subheading={"Refresh info"}></SectionTitle>
          <div>
                <form   onSubmit={handleSubmit(onSubmit)} >
                    <div className="  form-control w-full my-6">
                        <label className="label">
                            <span className=" label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Resipe Name"
                            {...register("name")} required
                            className=" input input-bordered w-full"
                        />
                    </div>
                    <div className=" flex flex-col md:flex-row gap-6">
                        {/* category */}
                        <div className="  form-control w-full md:my-6">
                            <label className="label">
                                <span className=" label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register("category")} required
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="desert">desert</option>
                                <option value="drinks">drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="  form-control w-full md:my-6">
                            <label className="label">
                                <span className=" label-text">Price</span>
                            </label>
                            <input
                                type="text"
                                defaultValue={price}
                                placeholder="price"
                                {...register("price")}
                                required
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="  form-control w-full mt-6">
                        <label className="label">
                            <span className=" label-text">Recipe Details</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe')} className=" textarea  textarea-bordered h-24" placeholder="Bio" required></textarea>
                    </div>
                    <div className="  form-control w-full my-6">
                        <input  {...register('image')} type="file" className=" file-input input-bordered w-full"  />
                    </div>

                    <div className=" flex justify-center my-6">
                        <button className=" btn  bg-orange-400 text-white w-1/2 md:w-1/4  hover:bg-orange-700">
                            Update Item <FaUtensils></FaUtensils>
                        </button>
                    </div>
                </form> 
            </div>
        </div>
    );
};

export default UpdateItem;