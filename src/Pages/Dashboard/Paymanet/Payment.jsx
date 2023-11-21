import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import ChackoutForm from "./ChackoutForm";

// TODO: and publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    return (
        <div>
            <SectionTitle heading={"Payment"} subheading={"Please pay to eat"}></SectionTitle>
          <div>
            <Elements stripe={stripePromise}>
             <ChackoutForm>

             </ChackoutForm>
            </Elements>
          </div>
        </div>
    );
};

export default Payment;