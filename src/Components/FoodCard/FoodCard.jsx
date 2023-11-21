import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";


const FoodCard = ({item}) => {
    const {_id, name, image,  price, recipe} = item;
    const { user } = useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [,refetch] = useCart(); 

    // add to cart
    const handleAddToCart = food => {
        if(user && user.email){
          
            console.log(food);
            const cartItem = {
                menuId : _id,
                email: user.email,
                name,
                image,
                price
            }
           
            try{
                axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if(res.data.insertedId){
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 2000
                          });
                        //   refetch the cart
                        refetch();
                    }
                })
            } catch (error){
                console.log(error);
            }
        }
        else{
            Swal.fire({
                title: "Your are not logged in",
                text: "Please login to add to the cart!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login"
              }).then((result) => {
                if (result.isConfirmed) {
                   navigate('/login',  {state: {from: location}} )
                }
              });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className=" bg-slate-900 text-white absolute rounded-xl ml-4 mt-4 px-4">${price}</p>
            <div className="card-body text-center flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button 
                    onClick={() => handleAddToCart(item) }
                    className="btn  btn-outline border-0 border-b-4 bg-orange-50 text-orange-400 border-orange-300 mt-4">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;