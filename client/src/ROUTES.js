import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { HOME_PATH } from "./constants/Pathes";
import App from "./App";

// TODO:: declare our router variable
const router = createBrowserRouter(
  createRoutesFromElements(<Route path={HOME_PATH} element={<App />} />)
);

export default router;
