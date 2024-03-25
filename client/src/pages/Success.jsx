import DeliveryMap from "../components/delivery/Map";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function Success() {
  return (
    <div className="pt-20">
      <div className="flex justify-center items-center text-2xl text-center font-bold text-green-500">
        <IoCheckmarkDoneCircle style={{ fontSize: "3rem" }} /> Payment is
        Successfully
      </div>
      <div class="inline-flex items-center justify-center w-full">
        <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-green-700" />
        <span class="absolute px-3 text-orange-500 font-bold -translate-x-1/2  left-1/2 dark:text-white dark:bg-orange-900">
          now
        </span>
      </div>
      <div className="flex justify-center items-center text-2xl text-center font-bold text-green-500">
        Tracking Your Order Live
      </div>
      <DeliveryMap />
    </div>
  );
}
