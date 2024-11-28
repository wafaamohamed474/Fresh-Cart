import React, { useEffect, useState } from "react";
import ProductsList from "../../components/productsList/ProductsList";
import BasicPagination from "../../components/pagination/Pagination";
const Products = () => {
  const [product, setProduct] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let itemsPerPage = 12;
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    fetch(
      `https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}&limit=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data);
        setTotalPages(data.metadata.numberOfPages);
       
        
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage]);

  
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="pTB">
      <ProductsList product={product} windowWidth={windowWidth} title="All" />
      <BasicPagination
        onchange={handlePageChange}
        currentPage={currentPage}
        count={totalPages}
      />
    </div>
  );
};

export default Products;
