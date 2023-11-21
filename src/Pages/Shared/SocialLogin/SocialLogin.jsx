import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth'
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const handleGooogleSignIn = () => {
        googleSignIn()
        .then(result => {
          const userInfo = {
            name: result.user?.displayName,
            email: result.user?.email,
            photo: result.user?.photoURL
          }
          axiosPublic.post('/users', userInfo)
          .then(res =>{
            console.log(res.data);
             navigate('/');
          })
        })
    }

    return (
        <div className=" px-8 ">
            <div className=" divider"></div>
            <div onClick={handleGooogleSignIn} className='flex text-blue-700 hover:text-white justify-center rounded-lg hover:bg-primary items-center space-x-2 border  p-2 border-gray-300 border-rounded cursor-pointer'>
                {/* <FaGoogle size={32} className="" /> */}
                <p>Continue with Google</p>
            </div>
        </div>
    );
};

export default SocialLogin;