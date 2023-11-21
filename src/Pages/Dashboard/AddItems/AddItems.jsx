import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data)
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

            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} added to menu`,
                    showConfirmButton: false,
                    timer: 2000
                });
            }

        }
    }
    
    return (
        <div>
            <SectionTitle heading={'add an item'} subheading={"What's new?"}></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="  form-control w-full my-6">
                        <label className="label">
                            <span className=" label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
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
                            <select defaultValue="default" {...register("category")} required
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
                        <textarea {...register('recipe')} className=" textarea  textarea-bordered h-24" placeholder="Bio" required></textarea>
                    </div>
                    <div className="  form-control w-full my-6">
                        <input {...register('image')} type="file" className=" file-input input-bordered w-full" required />
                    </div>

                    <div className=" flex justify-center my-6">
                        <button className=" btn  bg-orange-400 text-white w-1/2 md:w-1/4  hover:bg-orange-700">
                            Add Item <FaUtensils></FaUtensils>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;