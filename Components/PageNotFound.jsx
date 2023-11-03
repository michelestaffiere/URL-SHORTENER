import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>404!</h1>
      <h2>Sorry, The page you're looking for isn't here 😟</h2>
      <Link to="/">Return Home</Link>
    </div>
  );
};

export default PageNotFound
