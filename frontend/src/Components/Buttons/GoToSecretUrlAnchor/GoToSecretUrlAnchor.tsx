import { LOCAL_URL } from "../../../constants/constants";

type AnchorProps = {
  location: string;
  displayName: string;
}

const GoToSecretUrlAnchor = ({ location, displayName }: AnchorProps) => {


  const handleCreatedLink = (location: string) => {
    if (!location) {
      alert('No link created yet.');
      return;
    }
    window.open(`${LOCAL_URL}/secret/${location}`, "_blank");
  }

  return (
    <a className="pointer" onClick={() => handleCreatedLink(location)}>{displayName}</a>
  )
}

export default GoToSecretUrlAnchor;