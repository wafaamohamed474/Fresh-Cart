import React from "react";
import { useParams } from "react-router-dom";
import SpecificComponent from "../../components/spesificComponent/SpecificComponent";

function SpecificCategory() {
  const { CategoryID } = useParams();
  const url = "https://ecommerce.routemisr.com/api/v1/categories";
  return (
    <>
      <SpecificComponent
        SpecificID={CategoryID}
        URL={url}
        NameOfSapacific="Category"
      />
    </>
  );
}

export default SpecificCategory;
