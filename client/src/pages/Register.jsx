import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN_PATH } from "../constants/Pathes";
import loginSignupImage from "../assets/login-animation.gif";
import FormInputField from "../components/form/FormInputField";
import FormPasswordField from "../components/form/FormPasswordField";
import IsRequired from "../utils/validation/IsRequired";
import IsValidEmail from "../utils/validation/IsEmail";
import IsValidPassword from "../utils/validation/IsValidPassword";
import ImagetoBase64 from "../utils/images/ImagetoBase64";

export default function Register() {
  //* declare our component state and variables
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [errors, setErros] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  //*define our functions
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleUploadFile = async (e) => {
    let imageBase64Url = await ImagetoBase64(e.target.files[0]);
    setData((prev) => ({ ...prev, image: imageBase64Url }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //TODO::Validation Layer
    setErros({
      firstName: IsRequired(data.firstName) ? "" : "First Name is required.",
      lastName: IsRequired(data.lastName) ? "" : "First Name is required.",
      email: IsValidEmail(data.email) ? "" : "Invalid Email.",
      password: IsValidPassword(data.password)
        ? ""
        : `Password must containt 
           <br/>At least one lowercase alphabet i.e. [a-z]
           <br/>At least one uppercase alphabet i.e. [A-Z]
           <br/>At least one Numeric digit i.e. [0-9]
           <br/>At least one special character i.e. [@, $, ., #, !, %, *, ?, &, ^]
           <br/>Also, the total length must be in the range [8-15]`,
      confirmPassword:
        data.confirmPassword !== data.password
          ? "confirmPassword and password arnt matched"
          : "",
    });
    //TODO::check if data is invalid stop execution of function
    if (
      !IsRequired(data.firstName) ||
      !IsRequired(data.lastName) ||
      !IsValidEmail(data.email) ||
      !IsValidPassword(data.password) ||
      data.confirmPassword !== data.password
    ) {
      setLoading(false);
      return;
    }
    //TODO::send data to server
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}signup`;
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
          toast.success(result.message);
          setTimeout(() => {
            navigator(LOGIN_PATH);
          }, 1000);
        } else {
          console.log("result", result);
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
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img
            src={data.image ? data.image : loginSignupImage}
            className="w-full h-full"
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadFile}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <FormInputField
            id={"firstName"}
            name={"firstName"}
            label={"First Name"}
            value={data.firstName}
            type={"text"}
            handleOnChange={handleOnChange}
            errorMsg={errors.firstName}
            disabled={loading}
          />

          <FormInputField
            id={"lastName"}
            name={"lastName"}
            label={"Last Name"}
            value={data.lastName}
            type={"text"}
            handleOnChange={handleOnChange}
            errorMsg={errors.lastName}
            disabled={loading}
          />

          <FormInputField
            id={"email"}
            name={"email"}
            label={"E-mail"}
            value={data.email}
            type={"email"}
            handleOnChange={handleOnChange}
            errorMsg={errors.email}
            disabled={loading}
          />

          <FormPasswordField
            id={"password"}
            name={"password"}
            label={"Password"}
            value={data.password}
            handleOnChange={handleOnChange}
            errorMsg={errors.password}
            disabled={loading}
          />

          <FormPasswordField
            id={"confirmpassword"}
            name={"confirmPassword"}
            label={"Confirm Password"}
            value={data.confirmPassword}
            handleOnChange={handleOnChange}
            errorMsg={errors.confirmPassword}
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4"
          >
            Sign up
          </button>
        </form>
        <p className="text-left text-sm mt-2">
          Already have account ?{" "}
          <Link to={LOGIN_PATH} className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
