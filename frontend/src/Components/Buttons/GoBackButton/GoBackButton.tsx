import { useNavigate } from "react-router";

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>Go back</button>
  );
};
export default GoBackButton;
