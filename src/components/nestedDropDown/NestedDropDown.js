import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import "./nestedDropDown.css";
import { DropdownItem } from "react-bootstrap";
function NestedDropdown() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    fetch("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.data))
      .catch((error) => console.error("Error fetching categories:", error));

    fetch("https://ecommerce.routemisr.com/api/v1/subcategories")
      .then((response) => response.json())
      .then((data) => setSubcategories(data.data))
      .catch((error) => console.error("Error fetching subcategories:", error));
  }, []);

  const getSubcategoriesForCategory = (categoryId) =>
    subcategories.filter((subcategory) => subcategory.category === categoryId);

  return (
    <Dropdown className="nestedDropDown">
      <Dropdown.Toggle className="dropdown-Toggle"></Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-Menu">
        {categories.map((category) => (
          <Dropdown key={category._id} drop="end">
            <Dropdown.Toggle as="button" className="dropdown-item">
              <div className="imageBox">
                <img
                  src={category.image}
                  alt={`${category.name}-category-image`}
                />
              </div>
              {category.name}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-Menu dropdown-Menu2">
              {getSubcategoriesForCategory(category._id).length === 0 ? (
                <Dropdown.Item disabled>No subcategories</Dropdown.Item>
              ) : (
                getSubcategoriesForCategory(category._id).map((subcategory) => (
                  <Dropdown.Item
                    key={subcategory._id}
                    as={Link} // Use the Link component directly for the dropdown item
                    to={`/specific-subcategory/${subcategory._id}`}
                  >
                    {subcategory.name}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default NestedDropdown;
