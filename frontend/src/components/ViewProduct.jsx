import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  // const API = "http://localhost:5000/getproducts";

  useEffect(() => {
    axios
      // .get("http://localhost:5000/getproducts")
      .get("https://quleep-w47i.onrender.com/getproducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (!Array.isArray(products)) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-7 gap-4 mt-[2rem]">
      {products.map((product) => {
        return (
          <div 
          key={product._id}
          className="bg-gray-100 flex flex-col items-center"
          >
            <p>
              <img 
              className="h-[9rem]"
              src={product.images[0]} 
              alt="product_image"
              />
            </p>
              <h2><span>Name : </span>{product.name}</h2>
            
            {/* <div>
        {product.images.map((image, index) => {
          return (
            <div key={index}>
              <img src={image} alt={product._id}/>
            </div>
          );
        })}
      </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ViewProduct;
