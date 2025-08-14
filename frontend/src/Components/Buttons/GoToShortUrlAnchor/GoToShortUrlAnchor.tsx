import { getShortUrl } from "../../../utils/services/link.service";

type AnchorProps = {
  location: string;
  displayName: string;
}

const GoToShortUrlAnchor = ({ location, displayName }: AnchorProps) => {

  const handleCreatedLink = async (location: string) => {
    if (!location) {
      alert('No link created yet.');
      return;
    }
    const URL = await getShortUrl(location);
    window.open(`${URL}`, "_blank")
  }

  return (
    <a className="pointer" onClick={() => handleCreatedLink(location)}>{displayName}</a>
  )
}

export default GoToShortUrlAnchor;