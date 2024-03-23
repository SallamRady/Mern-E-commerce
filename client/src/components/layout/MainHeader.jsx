import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import {
  ABOUT_PATH,
  CART_PATH,
  CONTACT_PATH,
  HOME_PATH,
} from "../../constants/Pathes";
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from "react-icons/bs";
import { useState } from "react";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import jumpToReleventDiv from "../../utils/scrol/jumpToReleventDiv";

export default function MainHeader() {
  // *Declare our state variables
  const [showUserDropDown, setShowUserDropDown] = useState(false);
  const userState = useSelector((state) => state.user);

  // TODO::define our functions
  const toggleUserDropDown = () => setShowUserDropDown((prev) => !prev);

  // *Return our Component UI.
  return (
    <header className="flex shadow-md w-full h-16 px-2 md:px-4 justify-between bg-white">
      {/* desktop header */}
      <div className="flex items-center h-full">
        <Link to={HOME_PATH}>
          <div className="h-12">
            <img src={logoImg} alt="logo image" className="h-full" />
          </div>
        </Link>
      </div>
      {/* navbar menu */}
      <div className="flex items-center gap-4 md:gap-7">
        {/* navlinks */}
        <nav className="flex gap-3 md:gap-6 text-base md:text-lg">
          <Link to={HOME_PATH}>Home</Link>
          <Link onClick={() => jumpToReleventDiv("ourMenu")}>Menu</Link>
          <Link to={ABOUT_PATH}>About</Link>
          <Link to={CONTACT_PATH}>Contact</Link>
        </nav>
        {/* cart icon & actions */}
        <div className="text-2xl text-slate-600 relative">
          <Link to={CART_PATH}>
            <BsCartFill />
            <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center">
              0
            </div>
          </Link>
        </div>
        {/* user icon & auth  actions*/}
        <div
          className="text-2xl text-slate-600 relative cursor-pointer"
          onClick={() => toggleUserDropDown()}
        >
          <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
            {userState.image ? (
              <img src={userState.image} className="h-full w-full" />
            ) : (
              <HiOutlineUserCircle />
            )}
            {userState.firstName}
          </div>
          {showUserDropDown && <UserDropDown />}
        </div>
      </div>
    </header>
  );
}
