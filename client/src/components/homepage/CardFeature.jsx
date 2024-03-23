import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cart.slice";
import { toast, ToastContainer } from "react-toastify";

const CardFeature = ({ image, name, price, category, loading, id }) => {
  // * declare our component variables and state
  const dispatch = useDispatch();
  let btnClass = `
  relative h-12 w-40 
  overflow-hidden 
  border 
  rounded-md
  mt-1
  border-yellow-500 
  text-yellow-500 
  shadow-2xl 
  transition-all 
  duration-200 
  before:absolute 
  before:bottom-0 
  before:left-0 
  before:right-0 before:top-0 before:m-auto 
  before:h-0 before:w-0 before:rounded-sm 
  before:bg-yellow-500 before:duration-300 before:ease-out 
  hover:text-white hover:shadow-yellow-500 hover:before:h-40 
  hover:before:w-40 hover:before:opacity-80`;
  // define our helper functions
  const addProductToCart = (product) => {
    toast.success("Product added to card successfully.");
    dispatch(addToCart(product));
  };
  return (
    <>
      <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
        {image ? (
          <>
            <Link
              to={`/menu/${id}`}
              onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
            >
              <div className="h-28 flex flex-col justify-center items-center relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                <img
                  src={image}
                  className="h-full max-w-xs transition duration-300 ease-in-out hover:scale-110"
                />
              </div>
              <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
                {name}
              </h3>
              <p className=" text-slate-500  font-medium">{category}</p>
              <p className=" font-bold">
                <span className="text-red-500">₹</span>
                <span>{price}</span>
              </p>
            </Link>
            <button
              onClick={() =>
                addProductToCart({ image, name, price, category, loading, id })
              }
              class={btnClass}
            >
              <span class="relative z-10">Add To Cart</span>
            </button>
          </>
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>{loading}</p>
          </div>
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default CardFeature;
