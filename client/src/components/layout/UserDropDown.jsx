import { Link } from "react-router-dom";
import { LOGIN_PATH, NEW_PRODUCT_PATH, REGISTER_PATH } from "../../constants/Pathes";

export default function UserDropDown() {
  // * declare our state & variables
  let linkClass = "text-xs whitespace-nowrap cursor-pointer px-2";
  // * return out component ui
  return (
    <div className="absolute right-2 bg-white py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center">
      <Link to={NEW_PRODUCT_PATH} className={linkClass}>
        New product
      </Link>
      <Link to={LOGIN_PATH} className={linkClass}>
        Login
      </Link>
      <Link to={REGISTER_PATH} className={linkClass}>
        Register
      </Link>
      <p className={`${linkClass} text-red-500`}>
        Logout
      </p>
    </div>
  );
}
