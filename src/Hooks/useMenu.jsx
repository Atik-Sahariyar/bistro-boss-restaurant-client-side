import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const {data: menu, isPending: loading, refetch} = useQuery({
        queryKey: ['menu'],
        queryFn: async() => {
            const res = await axiosPublic.get('/menu');
            return res.data
        }
    })

    // const [menu, setMenu] = useState();
    // const [loading, setLoading ] = useState(true)
    // useEffect(() => {
    //     try {
    //         axios('http://localhost:5000/menu')
    //             .then(res => {
    //                 const data = res.data;
    //                 setMenu(data)
    //                 setLoading(false)
    //             })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])
    return [ menu, loading, refetch ];
};

export default useMenu;