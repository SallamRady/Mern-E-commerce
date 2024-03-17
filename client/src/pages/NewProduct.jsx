import { useState } from "react";
import FormInputField from "../components/form/FormInputField";
import FormSelectField from "../components/form/FormSelectField";
import { productCategories } from "../constants/ProductCategories";
import { BsCloudUpload } from "react-icons/bs";
import ImagetoBase64 from "../utils/images/ImagetoBase64";
import IsRequired from "../utils/validation/IsRequired";
import { ToastContainer, toast } from "react-toastify";

export default function NewProduct() {
  // TODO::declare our component state
  let initialDataState = {
    name: "",
    category: "fruits",
    images: [],
    price: "",
    description: "",
  };
  const [data, setData] = useState(initialDataState);
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    images: "",
    price: "",
    description: "",
  });
  const [imagesLenWarnning, setImagesLenWarnning] = useState("");
  const [loading, setLoading] = useState(false);

  //*define our functions
  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const uploadProductImages = async (e) => {
    let imagesData = [];
    for (let i = 0; i < Math.min(e.target.files.length, 4); i++) {
      const data = await ImagetoBase64(e.target.files[i]);
      imagesData.push(data);
    }
    if (e.target.files.length > 4) {
      setImagesLenWarnning("We just accept at most 4 images");
    } else {
      setImagesLenWarnning("");
    }
    setData((preve) => {
      return {
        ...preve,
        images: imagesData,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO::Validation Layer
    setErrors({
      name: IsRequired(data.name) ? "" : "Name is required.",
      images: data.images.length == 0 ? "Image/s is required" : "",
      price: IsRequired(data.price) ? "" : "Price is required.",
      description: IsRequired(data.description)
        ? ""
        : "Description is required.",
    });
    //TODO::check if data is invalid stop execution of function
    if (
      !IsRequired(data.name) ||
      !IsRequired(data.description) ||
      !IsRequired(data.price) ||
      data.images.length == 0
    ) {
      return;
    }
    //TODO::send data to server
    let url = `${process.env.REACT_APP_SERVER_DOMAIN}addProduct`;
    await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        toast.success(result.message);
        setData(initialDataState);
      })
      .catch((err) => {
        console.log("Error in add product Up Function::", err);
        toast.error("Unexpected Error :(");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
      >
        <FormInputField
          id={"name"}
          name={"name"}
          label={"Product Name"}
          value={data.name}
          type={"text"}
          handleOnChange={handleOnChange}
          errorMsg={errors.name}
        />

        <FormSelectField
          id={"category"}
          name={"category"}
          label={"Product Category"}
          value={data.category}
          options={productCategories}
          handleOnChange={handleOnChange}
          errorMsg={errors.category}
        />

        <label htmlFor="image">
          Product Image/s
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            <div
              className={`flex flex-col items-center ${
                data.images.length ? "justify-between" : "justify-center"
              } h-full`}
            >
              <span className="text-5xl">
                <BsCloudUpload className="pt-2" />
              </span>
              {data.images.length > 0 && (
                <div className="flex w-full justify-between h-1/2 overflow-hidden">
                  {data.images.map((imgSrc) => {
                    return (
                      <img
                        key={`img_${Math.random()}_${imgSrc}`}
                        src={imgSrc}
                        className="mx-1"
                        style={{
                          width: "80px",
                          height: "80px",
                          border: "1px solid #ff00003b",
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <input
              type={"file"}
              accept="image/*"
              id="image"
              multiple
              onChange={uploadProductImages}
              className="hidden"
            />
          </div>
        </label>
        {imagesLenWarnning && (
          <p className="text-xs text-orange-600">{imagesLenWarnning}</p>
        )}
        {errors.images && (
          <p className="text-xs text-red-600">{errors.images}</p>
        )}

        <FormInputField
          id={"price"}
          name={"price"}
          label={"Product Price"}
          value={data.price}
          type={"text"}
          handleOnChange={handleOnChange}
          errorMsg={errors.price}
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          value={data.description}
          className={`mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300`}
          name="description"
          onChange={handleOnChange}
        ></textarea>
        {errors.description && (
          <p className="text-xs text-red-600">{errors.description}</p>
        )}

        <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
