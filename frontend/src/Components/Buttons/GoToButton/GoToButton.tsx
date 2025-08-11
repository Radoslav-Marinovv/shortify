import { useNavigate } from "react-router";

type ButtonProps = {
  location: string;
  displayName: string;
}

const GoToButton = ({ location, displayName }: ButtonProps) => {

  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`${location}`)}>Go to {displayName}</button>
  )
}

export default GoToButton;