import { loadStripe } from "@stripe/stripe-js"
import SectionTitle from "../../componants/sectionTitle/sectionTitle"
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./Cheackout";

const stripePromise=loadStripe(import.meta.env.VITE_Payment_pk);
const Payment = () => {
  return (
    <div>
     <SectionTitle heading="Payment">

     </SectionTitle>
     <div>
       <Elements stripe={stripePromise}>
       <Checkout></Checkout>
       </Elements>
     </div>
    </div>
  )
}

export default Payment