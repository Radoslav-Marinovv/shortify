import { useNavigate } from "react-router";
import './ErrorNotFound.css';
const ErrorNotFound = () => {

  const navigate = useNavigate();

  return (
    <>
      <h1>Error 404!</h1>
      <p>Page not found</p>
      <p>Try again later</p>
      <div className="error-div-buttons">
        <button onClick={() => navigate('/')}>Go to Shortify homepage</button>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  )
}

export default ErrorNotFound
