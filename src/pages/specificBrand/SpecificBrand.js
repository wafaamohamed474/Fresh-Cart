import { useParams } from "react-router-dom";
import React from "react";
import SpecificComponent from "../../components/spesificComponent/SpecificComponent";
const SpecificBrand = () => {
  const { BrandID } = useParams();
  const url = "https://ecommerce.routemisr.com/api/v1/brands";
  return (
    <>
      <SpecificComponent
        SpecificID={BrandID}
        NameOfSapacific="Brand"
        URL={url}
      />
    </>
  );
};

export default SpecificBrand;
