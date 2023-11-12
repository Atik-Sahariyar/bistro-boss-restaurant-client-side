import PropTypes from "prop-types"

const SectionTitle = ({heading , subheading}) => {
    return (
        <div className=" mx-auto text-center my-8  w-1/2 md:w-3/12">
             <p className=" text-yellow-600 mb-2 ">---{subheading}---</p>
            <p className=" text-3xl uppercase border-y-4 py-4 ">{heading}</p>
           
        </div>
    );
};
SectionTitle.propTypes ={ 
    heading: PropTypes.string,
    subheading: PropTypes.string
}
export default SectionTitle;