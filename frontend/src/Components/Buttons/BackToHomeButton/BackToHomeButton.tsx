import { useNavigate } from "react-router";

const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/")}>Go to Home</button>
  );
};
export default BackToHomeButton;