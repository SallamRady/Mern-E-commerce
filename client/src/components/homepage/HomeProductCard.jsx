import { Link } from "react-router-dom";
import { MENU_PATH } from "../../constants/Pathes";

export default function HomeProductCard({
  name,
  image,
  category,
  price,
  loading,
  id,
}) {
  return (
    <div className="bg-white shadow-md p-2 rounded min-w-[150px]">
      {name ? (
        <>
          <Link to={MENU_PATH}>
            {/* <div className="w-44 min-h-[150px]">
              <img src={image} className="h-full w-full" />
            </div> */}
            <div className="w-44 min-h-[150px] h-28 flex flex-col justify-center items-center relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
                <img
                  src={image}
                  className="h-full max-w-xs transition duration-300 ease-in-out hover:scale-110"
                />
              </div>
            <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">
              {name}
            </h3>
            <p className="text-center text-slate-500  font-medium">
              {category}
            </p>
            <p className="text-center font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>{loading}</p>
        </div>
      )}
    </div>
  );
}
