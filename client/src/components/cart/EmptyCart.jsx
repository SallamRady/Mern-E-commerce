import emptyCartImage from "../../assets/empty.gif";

export default function EmptyCart() {
  return (
    <>
      <div className="flex w-full justify-center items-center flex-col">
        <img src={emptyCartImage} className="w-full max-w-sm" />
        <p className="text-slate-500 text-2xl font-bold">Cart is empty</p>
      </div>
    </>
  );
}
