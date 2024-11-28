import { Link } from "react-router-dom";
import errorImg from "../../assets/error.svg";
import './notFound.css'
const NotFound = () => {
  return (
    <div className="notFound">
      <div className="container">
        <img src={errorImg} alt="not found img" />
        <div className="title">
          Sorry! Looks There is something wrong
          <span>Let's back to home page</span>
          </div>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
