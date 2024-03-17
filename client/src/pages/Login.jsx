import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HOME_PATH, REGISTER_PATH } from "../constants/Pathes";
import FormInputField from "../components/form/FormInputField";
import FormPasswordField from "../components/form/FormPasswordField";
import IsRequired from "../utils/validation/IsRequired";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginMethod } from "../redux/slices/user.slice";

export default function Login() {
  //* declare our component state and variables
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErros] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //*define our functions
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO::Validation Layer
    setErros({
      email: IsRequired(data.email) ? "" : "E-mail is required.",
      password: IsRequired(data.password) ? "" : "Passwordis required.",
    });
    //TODO::check if data is invalid stop execution of function
    if (!IsRequired(data.email) || !IsRequired(data.password)) {
      return;
    }
    //TODO::send data to server
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}signin`;
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.ok) {
          dispatch(loginMethod(result));
          toast.success(result.message);
          setTimeout(() => {
            navigator(HOME_PATH);
          }, 1000);
        } else {
          toast.error(result.message);
        }
      })
      .catch((err) => {
        console.log("Error in Sign Up Function::", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //* return our component ui
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <h1 className="text-center text-2xl font-bold">Login</h1>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <FormInputField
            id={"email"}
            name={"email"}
            label={"E-mail"}
            value={data.email}
            type={"email"}
            handleOnChange={handleOnChange}
            errorMsg={errors.email}
          />

          <FormPasswordField
            id={"password"}
            name={"password"}
            label={"Password"}
            value={data.password}
            handleOnChange={handleOnChange}
            errorMsg={errors.password}
          />

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Sign In
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          You dont have an account ?{" "}
          <Link to={REGISTER_PATH} className="text-red-500 underline">
            Register
          </Link>
        </p>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
