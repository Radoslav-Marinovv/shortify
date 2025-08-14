import { useNavigate } from "react-router";

type AnchorProps = {
  location: string;
  displayName: string;
}

const GoToSecretUrlAnchor = ({ location, displayName }: AnchorProps) => {

  const navigate = useNavigate();

  const handleCreatedLink = async (location: string) => {
    if (!location) {
      alert('No link created yet.');
      return;
    }

    navigate(`/secret/${location}`, { replace: true });
  }

  return (
    <a onClick={() => handleCreatedLink(location)}>{displayName}</a>
  )
}

export default GoToSecretUrlAnchor;