import GoBackButton from "../../Components/Buttons/GoBackButton/GoBackButton";
import BackToHomeButton from "../../Components/Buttons/BackToHomeButton/BackToHomeButton";

import './ErrorNotFound.css';

const ErrorNotFound = () => {

  return (
    <div className="container error-container">
      <h1>Error 404!</h1>
      <p>Page not found</p>
      <p>Try again later</p>
      <div className="error-div-buttons">
        <BackToHomeButton />
        <GoBackButton />
      </div>
    </div>
  )
}

export default ErrorNotFound
