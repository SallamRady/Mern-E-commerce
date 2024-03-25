import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/cart/EmptyCart";
import CartProduct from "../components/cart/CartProduct";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN_PATH } from "../constants/Pathes";
import { useState } from "react";

const Cart = () => {
  //* declare ans define our component state var..
  const userState = useSelector((state) => state.user);
  const cartSate = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const cartItems = cartSate.items;

  // TODO::Handle payment function
  const handlePayment = async () => {
    if (userState.email) {
      setLoading(true);
      console.log("API Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
      );
      let body = {
        amount: cartSate.amount,
        products: cartSate.items,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      };
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}create-checkout-session`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      console.log("Response101 res:", res);
      if (res.statusCode === 500) {
        toast.error("Operations doesnt complete unexpected error");
        return;
      }

      const data = await res.json();
      console.log("Response101 data:", data);

      toast.success("You Will Redirect to payment Gateway!");
      setLoading(false);
      stripePromise.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      setLoading(false);
      toast.error("You have not Login!");
      setTimeout(() => {
        navigate(LOGIN_PATH);
      }, 1000);
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600 mt-20">
          Your Cart Items
        </h2>
        {cartItems.length > 0 ? (
          <div className="my-4 flex gap-3">
            {/* display cart items  */}
            <div className="w-full max-w-3xl ">
              {cartItems.map((el) => {
                return (
                  <CartProduct
                    key={el.id}
                    id={el.id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.quantity}
                    total={+el.quantity * +el.price}
                    price={el.price}
                  />
                );
              })}
            </div>

            {/* total cart item  */}
            <div className="w-full max-w-md  ml-auto">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{cartSate.quantity}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500">₹</span> {cartSate.amount}
                </p>
              </div>
              <button
                disabled={loading}
                onClick={() => handlePayment()}
                className="flex items-center justify-center text-red hover:before:bg-redborder-red-500 relative h-[50px] w-full overflow-hidden border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full"
              >
                <span className="relative z-10 mx-1">Payment </span>
                {loading && (
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-500 hover:fill-gray-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Cart;
