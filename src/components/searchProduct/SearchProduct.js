import React, { useEffect, useState } from "react";
import "./searchProduct.css";
import { Link } from "react-router-dom";

const SearchProduct = () => {
  const [product, setProduct] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filterProducts, setFilterProduct] = useState([]);
  useEffect(() => {
    fetch(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const FilterProducts = product.filter((prod) =>
      prod.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilterProduct(FilterProducts);
  }, [searchItem, product]);
  const handleSearch = (e) => {
    e.preventDefault();
  };
  const handleProductClick = () => {
    setSearchItem("");
  };
  return (
    <>
      <form className="d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <button className="btn" type="submit">
          Search
        </button>
        {searchItem && (
          <div className="searchProducts">
            {filterProducts.map((e) => (
              <Link
                key={e._id}
                to={`/details/${e._id}`}
                className="searchContent"
                onClick={handleProductClick}
              >
                <div className="imageBox">
                  <img src={e.imageCover} alt="" />
                </div>
                <div className="searchDetails">
                  <h5>{e.title}</h5>
                  <span>{e.slug.slice(0, 12)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default SearchProduct;
