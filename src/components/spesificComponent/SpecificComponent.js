import React, { useEffect, useState } from "react";
import "./specificComponent.css";
import RelatedProducts from "../relatedProducts/RelatedProducts";
const SpecificComponent = ({ SpecificID, NameOfSapacific, URL }) => {
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`${URL}/${SpecificID}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [SpecificID]);
  return (
    <div className="specificComponent pTB">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-2">
            <div className="imageBox">
              <img src={product.image} alt={`${product.name} img`} />
            </div>
          </div>
          <div className="col-12 col-md-10">
            <div className="spacificDetails">
              <h2>{NameOfSapacific} Name</h2>
              <h3>{product.name}</h3>
              <h4>{product.slug}</h4>
              <p>
                Last Update : <span>{product.updatedAt}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <RelatedProducts relatedProducts={product.name} />
        </div>
      </div>
    </div>
  );
};

export default SpecificComponent;
