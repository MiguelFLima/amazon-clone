import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.stripe_public_key)


function Checkout() {

  const total = useSelector((selectTotal));

  const { data: session, status } = useSession();
  const items = useSelector(selectItems);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    // call the backend to cretae a checkout session
    debugger
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items: items,
      email: session.user.email
    })

    // Redirect User to Stripe Checkout

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if(result.error) alert(result.error.message);

  }

  return (
    <div className="bg-gray-100">
        <Header />

        <main className="lg:flex max-w-screen-2xl mx-auto">
          {/* LEFT */}
          <div className="flex-grow m-5 shadow-sm">
            <Image
              src="http://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit='contain'
            />

            <div className="flex flex-col p-5 space-y-10 bg-white">
              <h1 className="text-3xl border-b pb-4">{items.length === 0 ? 'Your Shopping Basket is empty' : 'Shopping Basket'}</h1>

              {items.map((item, i) => (
                <CheckoutProduct
                  key={i}
                  id = {item.id}
                  title = {item.title} 
                  price = {item.price}
                  rating = {item.rating}
                  description = {item.description}
                  category = {item.category}
                  image = {item.image} 
                  hasPrime = {item.hasPrime} 
                />
              ))}
            </div>
          </div>


          {/* RIGHT */}
          <div className="flex flex-col bg-white p-10 shadow-md">
                {items.length > 0 && (
                  <>
                    <h2 className="whitespace-nowrap">Subtotal ({items.length} itens): {" "} 
                    <span className="font-bold">
                      <Currency quantity={total} currency='brl' />  
                    </span> 
                    </h2>

                    <button
                      onClick={createCheckoutSession} 
                      role='link'
                      disable={!session}
                      className={`button mt-3 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                      {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                    </button>
                  </>
                )}
          </div>
        </main>
    </div>
  )
}

export default Checkout