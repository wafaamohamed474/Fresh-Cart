import React from "react";
import SpecificComponent from "../../components/spesificComponent/SpecificComponent";
import { useParams } from "react-router-dom";

const SpecificSubCategory = () => {
  const { SubCategoryID } = useParams();
  const url = "https://ecommerce.routemisr.com/api/v1/subcategories";
  return (
    <>
      <SpecificComponent
        SpecificID={SubCategoryID}
        URL={url}
        NameOfSapacific="SubCategory"
      />
    </>
  );
};

export default SpecificSubCategory;
