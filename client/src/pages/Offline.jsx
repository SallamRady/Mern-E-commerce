import { Link } from "react-router-dom";
import { HOME_PATH } from "../constants/Pathes";

export default function Offline() {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-6xl font-semibold text-red-500 pt-20">404</h1>
      <p className="mb-4 text-lg text-gray-600">
        Oops! Looks like you're lost Or this Page hasn't been cached yet :/
        <br />
        You can try <Link to={HOME_PATH}>anthor page.</Link>
      </p>
      <div className="animate-bounce">
        <svg
          className="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p className="mt-4 text-gray-600">
        Let's get you back{" "}
        <Link to={HOME_PATH} className="text-blue-500">
          home
        </Link>
        .
      </p>
    </div>
  );
}
