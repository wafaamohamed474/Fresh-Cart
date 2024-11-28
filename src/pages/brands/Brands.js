import React from "react";

import ShareComponent from "../../components/shareComponent/ShareComponent";

const Brands = () => {
  const url = "https://ecommerce.routemisr.com/api/v1/brands";
  const title = "Brands";
  const typeProduct = "brand";
  return (
    <div>
      <ShareComponent url={url} title={title} typeProduct={typeProduct} />
    </div>
  );
};

export default Brands;
