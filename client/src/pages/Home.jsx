import ProductList from "../components/Products/ProductList";
import FreshVegetables from "../components/homepage/FreshVegetables";
import HomeHeader from "../components/homepage/HomeHeader";

export default function Home() {
  return (
    <div className="p-2 md:p-4">
      <HomeHeader />
      <FreshVegetables />
      <ProductList id={'ourMenu'} heading={"Explore Our Products"} />
    </div>
  );
}
