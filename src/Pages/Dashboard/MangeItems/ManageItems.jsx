import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading,  refetch] = useMenu();
    const axiosSecure = useAxiosSecure();
 
     
    if(loading){
        return <div className=" h-screen flex justify-center items-center text-3xl"><p>Menu Loading...</p></div>
    }
    // delete item 
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/menu/${item._id}`);
                    console.log(res);

                    if (res.status === 200 && res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: `${item.name} has been deleted.`,
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete item.",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete item.",
                        icon: "error"
                    });
                }
            }
        });
    }
    
    return (
        <div>
            <SectionTitle heading={"Manage All Items"} subheading={"Hurry up"}></SectionTitle>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead className=" bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu?.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    {item?.name}
                                </td>
                                <td>{item?.price}</td>
                                <th>
                                    <Link to = {`/dashboard/updateItem/${item._id}`}>
                                    <button className="btn btn-ghost btn-lg">
                                        <FaEdit className=" text-red-600"></FaEdit>
                                    </button>
                                    </Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className=" text-red-600"></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>)
                        }


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ManageItems;