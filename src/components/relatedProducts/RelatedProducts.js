import React, { useEffect, useState } from "react";
import ProductsList from "../productsList/ProductsList";
import BasicPagination from "../pagination/Pagination";
const RelatedProducts = ({ relatedProducts }) => {
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [foundRelated, setFoundRelated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(true);
  const productsPerPage = 8;
  useEffect(() => {
    const fetchAllProducts = async () => {
      let allProducts = [];
      let currentPage = 1;
      while (currentPage <= 2) {
        const response = await fetch(
          `https://ecommerce.routemisr.com/api/v1/products?page=${currentPage}&limit=40`
        );
        const data = await response.json();
        allProducts = [...allProducts, ...data.data];
        currentPage++;
      }
      setProduct(allProducts);
      setLoader(false);
    };
    fetchAllProducts();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage]);

  useEffect(() => {
    const FilterProducts = product.filter((prod) => {
      const matchesCategory =
        prod.category &&
        prod.category.name.toLowerCase() === relatedProducts.toLowerCase();
      const matchesBrand =
        prod.brand &&
        prod.brand.name.toLowerCase() === relatedProducts.toLowerCase();
      return matchesCategory || matchesBrand;
    });

    setFilterProduct(FilterProducts);
    const totalPages = Math.ceil(FilterProducts.length / productsPerPage);
    setTotalPages(totalPages);

    setFoundRelated(FilterProducts.length > 0);
  }, [product, relatedProducts]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log(currentPage);
  };
  const paginatedProducts = filterProduct.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <>
      {loader ? (
        <div className="row justify-content-center"><div class="spinner-border" role="status"></div></div>
      ) : foundRelated ? (
        <>
          <ProductsList
            product={paginatedProducts}
            windowWidth={windowWidth}
            title="Related"
          />
          <BasicPagination
            onchange={handlePageChange}
            currentPage={currentPage}
            count={totalPages}
          />
        </>
      ) : (
        <div className="alertMsg">No products with this name</div>
      )}
    </>
  );
};

export default RelatedProducts;
