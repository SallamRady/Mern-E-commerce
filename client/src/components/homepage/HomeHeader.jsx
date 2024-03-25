import { useSelector } from "react-redux";
import HomeProductCard from "./HomeProductCard";
import jumpToReleventDiv from "../../utils/scrol/jumpToReleventDiv";

export default function HomeHeader() {
  let productState = useSelector((state) => state.product.productList);
  let homeCardProducts = productState?.slice(1, 5);
  let loadingArr = new Array(4).fill(null);

  return (
    <div className="md:flex gap-4 py-2 mt-20">
      <div className="md:w-1/2">
        <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
          <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
            className="h-7"
          />
        </div>
        <h2 className="text-4xl md:text-7xl font-bold py-3">
          Faster Delivery To{" "}
          <span className="text-red-500 text-">Your Home</span>
        </h2>
        <p className="py-3 text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries
        </p>
        <button
          onClick={() => jumpToReleventDiv("ourMenu")}
          className="relative rounded-lg flex h-[50px] w-40 items-center justify-center overflow-hidden bg-red-500 font-medium text-white shadow-2xl transition-all duration-300 before:absolute before:inset-0 before:border-0 before:border-white before:duration-100 before:ease-linear hover:bg-white hover:text-red-500 hover:shadow-red-500 hover:before:border-[25px]"
        >
          <span className="relative z-10">Order Now</span>
        </button>
      </div>

      <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
        {homeCardProducts?.length > 0
          ? homeCardProducts.map((el) => {
              return (
                <HomeProductCard
                  key={el._id}
                  id={el._id}
                  image={el.images[0]}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
          : loadingArr.map((ele, idx) => {
              return (
                <HomeProductCard
                  key={`${Math.random()}_${idx}_empty_card`}
                  loading={"Loading..."}
                />
              );
            })}
      </div>
    </div>
  );
}
