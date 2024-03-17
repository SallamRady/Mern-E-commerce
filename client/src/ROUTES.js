import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  ABOUT_PATH,
  CART_PATH,
  CONTACT_PATH,
  HOME_PATH,
  LOGIN_PATH,
  MENU_PATH,
  NEW_PRODUCT_PATH,
  REGISTER_PATH,
} from "./constants/Pathes";
import App from "./App";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewProduct from "./pages/NewProduct";

// TODO:: declare our router variable
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={HOME_PATH} element={<App />}>
      <Route index element={<Home />} />
      <Route path={MENU_PATH} element={<Menu />} />
      <Route path={ABOUT_PATH} element={<About />} />
      <Route path={CONTACT_PATH} element={<Contact />} />
      <Route path={CART_PATH} element={<Cart />} />
      <Route path={LOGIN_PATH} element={<Login />} />
      <Route path={REGISTER_PATH} element={<Register />} />
      <Route path={NEW_PRODUCT_PATH} element={<NewProduct />} />
    </Route>
  )
);

export default router;
