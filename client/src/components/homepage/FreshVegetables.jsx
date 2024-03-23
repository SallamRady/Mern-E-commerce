import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from "./CardFeature";

export default function FreshVegetables() {
  // *declare component state variables
  const [loading, setLoading] = useState(false);
  const productData = useSelector((state) => state.product.productList);
  const homeProductCartListVegetables = productData?.filter(
    (el) => el.category === "vegetable",
    []
  );
  const loadingArrayFeature = new Array(10).fill(null);
  const slideProductRef = useRef();
  // TODO::declare component function
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };
  // *return  component ui.
  return (
    <div>
      <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">
          Fresh Vegetables
        </h2>
        <div className="ml-auto flex gap-4">
          <button
            onClick={preveProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
          >
            <GrNext />
          </button>
        </div>
      </div>
      <div
        className="flex gap-5 overflow-scroll scroll-smooth transition-all overscroll-behavior-smooth"
        ref={slideProductRef}
      >
        {homeProductCartListVegetables &&
        homeProductCartListVegetables.length > 0
          ? homeProductCartListVegetables.map((el) => {
              return (
                <CardFeature
                  key={el._id + "vegetable"}
                  id={el._id}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                  image={el.images[0]}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "cartLoading"} />
            ))}
      </div>
    </div>
  );
}
