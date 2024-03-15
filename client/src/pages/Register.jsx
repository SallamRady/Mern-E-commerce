import { useState } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATH } from "../constants/Pathes";
import loginSignupImage from "../assets/login-animation.gif";
import FormInputField from "../components/form/FormInputField";
import FormPasswordField from "../components/form/FormPasswordField";
import IsRequired from "../utils/validation/IsRequired";
import IsValidEmail from "../utils/validation/IsEmail";
import IsValidPassword from "../utils/validation/IsValidPassword";

export default function Register() {
  //* declare our component state and variables
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErros] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //*define our functions
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
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
      return;
    }
    //TODO::send data to server
    console.log("data is valid send data to server ", data);
  };

  //* return our component ui
  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={loginSignupImage} className="w-full h-full" />
          <h1 className="text-center text-2xl font-bold">Register</h1>
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
          />

          <FormInputField
            id={"lastName"}
            name={"lastName"}
            label={"Last Name"}
            value={data.lastName}
            type={"text"}
            handleOnChange={handleOnChange}
            errorMsg={errors.lastName}
          />

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

          <FormPasswordField
            id={"confirmpassword"}
            name={"confirmPassword"}
            label={"Confirm Password"}
            value={data.confirmPassword}
            handleOnChange={handleOnChange}
            errorMsg={errors.confirmPassword}
          />

          <button
            type="submit"
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
    </div>
  );
}
