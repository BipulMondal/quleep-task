import React, { useState } from "react";
import axios from 'axios'

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: " ",
    price: " ",
    currency: " ",
    color: " ",
    description: " ",
    images: [],
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    if(name === "images"){
      const selectFiles = e.target.files;
      setFormData({...formData, images: selectFiles});
    }
    else if(name === "currency"){
      setFormData({...formData, currency: value})
    }
    else{
      setFormData({...formData, [name] : value})
    }

  };


  const submitData = async() => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("color", formData.color);
    data.append("price", formData.price);
    data.append("currency", formData.currency);

  if(formData.images && formData.images.length >0) {
    for(let i = 0; i<formData.images.length; i++) {
      data.append("images", formData.images[i])
    }
  }
  else{
    console.log("please select atleast one image")
  }

    try {
        const res = await axios.post("/createProduct", data);
        console.log(res)
      } catch(error) {
        console.log(error);
      }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      submitData();

    setFormData({
      name: " ",
      price: " ",
      currency: " ",
      color: " ",
      description: " ",
      images: [],
    })

   
  };

  return (
    <div className="w-auto h-screen bg-teal-400 flex flex-col items-center font-semibold">
      <h3 className="text-2xl font-bold text-white">Sell your Products with us</h3>
      <hr className="h-[0.2rem] w-[20rem] bg-white"/>
      <form action="/mypost" method="post" encType="multipart/form-data ">
        <div className="mt-[2rem] border border-2 p-[2rem]">
          <label 
          className="text-lg "
          htmlFor="ProductName">
            Product Name :
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Product Name"
            onChange={handleChange}
            autoComplete="off"
            className="h-[2rem] w-[20rem] my-[0.5rem] ml-[4rem] pl-[0.5rem] focus:outline-none ml-[1rem] "
          />
          <br />
          <label className="text-lg" htmlFor="ProductPrice">Product Price : </label>
          <input
            type="text"
            id="price"
            name="price"
            placeholder="Enter Product Price"
            onChange={handleChange}
            autoComplete="off"
            className="h-[2rem] w-[20rem] my-[0.5rem] ml-[4.2rem] pl-[0.5rem] focus:outline-none ml-[1rem] "
          /><select 
          className="ml-[1rem] h-[2rem] w-[3rem]"
          name="currency" 
          id="currency"
           onChange={handleChange}>
          <option value="₹">₹</option>
          <option value="$">$</option>
          <option value="€">€</option>
      </select>
          <br />
          <label className="text-lg" htmlFor="ProductColor">Product Color :</label>
          <input
            type="text"
            id="color"
            name="color"
            placeholder="Enter Product Color"
            onChange={handleChange}
            autoComplete="off"
            className="h-[2rem] w-[20rem] my-[0.5rem] ml-[4.2rem] pl-[0.5rem] focus:outline-none ml-[1rem] "
          />
          <br />
          <label 
          className="text-lg"
          htmlFor="ProductDescription">
            Product Description : </label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Enter Product Description"
            onChange={handleChange}
            autoComplete="off"
            className="w-[20rem] my-[0.5rem] pl-[0.5rem] focus:outline-none ml-[1rem] align-text-top resize-y"
          />
          <br />
          <label htmlFor="samplefile">Choose Images :</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleChange}
            autoComplete="off"
            multiple
            className="h-[2rem] w-[20rem] my-[0.5rem] pl-[0.5rem] focus:outline-none ml-[0.5rem] ml-[4rem] "
          />
          <br />
          <div className="flex justify-center w-5/6 mt-[2rem] font-semibold text-black hover:text-white">
          <button
          className="h-[2.5rem] w-[8rem] bg-blue-800 rounded rounded-3xl"
          type="submit"
          onClick={handleSubmit}>
            Submit 
          </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
