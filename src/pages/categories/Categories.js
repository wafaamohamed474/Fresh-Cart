import React from "react";
import ShareComponent from "../../components/shareComponent/ShareComponent";

const Categories = () => {
  const url = "https://ecommerce.routemisr.com/api/v1/categories";
  const title = "Categories";
  const typeProduct = "category";
  return (
    <div>
      <ShareComponent url={url} title={title} typeProduct={typeProduct} />
    </div>
  );
};

export default Categories;
