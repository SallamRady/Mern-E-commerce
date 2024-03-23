import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardFeature from "../homepage/CardFeature";

export default function ProductList({ heading,id }) {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData?.map((el) => el.category))];

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return (
    <div id={id} className="my-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

      <div className="flex gap-4 justify-center">
        {categoryList && categoryList.length ? (
          categoryList?.map((el) => {
            return (
              <FilterProduct
                category={el}
                key={el}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            );
          })
        ) : (
          <div className="min-h-[150px] flex justify-center items-center">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter && dataFilter.length
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.images[0]}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : loadingArrayFeature.map((el, index) => (
              <CardFeature loading="Loading..." key={index + "allProduct"} />
            ))}
      </div>
    </div>
  );
}
