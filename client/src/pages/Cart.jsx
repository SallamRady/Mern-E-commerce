import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../components/cart/EmptyCart";
import CartProduct from "../components/cart/CartProduct";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN_PATH } from "../constants/Pathes";

const Cart = () => {
  //* declare ans define our component state var..
  const userState = useSelector((state) => state.user);
  const cartSate = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const cartItems = cartSate.items;

  // TODO::Handle payment function
  const handlePayment = async () => {
    if (userState.email) {
      console.log("API Key:",process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
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
      stripePromise.redirectToCheckout({ sessionId: data.sessionId });
    } else {
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
                onClick={() => handlePayment()}
                class="text-red hover:before:bg-redborder-red-500 relative h-[50px] w-full overflow-hidden border border-red-500 bg-white px-3 text-red-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-500 before:transition-all before:duration-500 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full"
              >
                <span class="relative z-10">Payment</span>
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
