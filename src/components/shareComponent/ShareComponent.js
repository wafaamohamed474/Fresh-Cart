import React, { useEffect, useState } from "react";
import "./shareComponent.css";
import { Link } from "react-router-dom";
import BasicPagination from "../pagination/Pagination";
const ShareComponent = ({ url, title, typeProduct }) => {
  const [element, setElement] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moreProducts = 8;
  const DisplayEement = () => {
    useEffect(() => {
      fetch(`${url}?page=${currentPage}&limit=${moreProducts}`)
        .then((response) => response.json())
        .then((data) => {
          setElement(data.data);
          setTotalPages(data.metadata.numberOfPages);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }, [currentPage]);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  DisplayEement();
  return (
    <div className="shareComponent">
      <div className="container">
        <h1>
          All <span>{title}</span>
        </h1>
        <div className="row">
          {element.map((e) => (
            <div className="col-12 col-md-3" key={e._id}>
              <Link to={`/specific-${typeProduct}/${e._id}`}>
                <div className="box-content">
                  <div className="Image-box">
                    <img src={e.image} alt="" />
                  </div>
                  <h5>{e.name}</h5>
                  <span>{e.slug}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <BasicPagination
        onchange={handlePageChange}
        count={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ShareComponent;
