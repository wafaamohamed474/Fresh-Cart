import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UpButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };
  return (
    <>
      <button className="UpButton main-btn" onClick={() => scrollToTop()}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </>
  );
};

export default UpButton;
