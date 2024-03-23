import { useSelector } from "react-redux";
import HomeProductCard from "./HomeProductCard";
import jumpToReleventDiv from "../../utils/scrol/jumpToReleventDiv";

export default function HomeHeader() {
  let productState = useSelector((state) => state.product.productList);
  let homeCardProducts = productState?.slice(1, 5);
  let loadingArr = new Array(4).fill(null);
  console.log("productState", homeCardProducts);
  return (
    <div className="md:flex gap-4 py-2">
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
          <span className="text-red-600 text-">Your Home</span>
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
          className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md"
        >
          Order Now
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
