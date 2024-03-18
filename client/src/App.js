import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/user.slice";
import { setDataProduct } from "./redux/slices/product.slice";

function App() {
  // * declare our state variables
  const dispatch = useDispatch();
  // * define our functions
  const getProductData = () => {
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}products`;
    fetch(url, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        dispatch(setDataProduct(result.products));
      })
      .catch((err) => {
        console.log("Error in fetch products Function in redux::", err);
      });
  };
  //TODO::Check if user is authorized or not?
  useEffect(async () => {
    dispatch(checkAuth());
    getProductData();
  }, []);
  // * return component ui
  return (
    <div>
      <MainHeader />
      <main className="bg-slate-100 min-h-[calc(100vh)]">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
