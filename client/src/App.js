import { Outlet } from "react-router-dom";
import "./App.css";
import MainHeader from "./components/layout/MainHeader";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/slices/user.slice";

function App() {
  // * declare our state variables
  const dispatch = useDispatch();
  //TODO::Check if user is authorized or not?
  useEffect(() => {
    dispatch(checkAuth());
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
