import { Suspense, useState } from "react";

import BackToHome from "../../Components/Buttons/BackToHomeButton/BackToHomeButton";
import GoToShortUrlAnchor from "../../Components/Buttons/GoToShortUrlAnchor/GoToShortUrlAnchor";

import { postCreateLink, type CreateLinkResponse } from "../../utils/services/link.service";
import { MIN_URL_LENGTH, SERVER_URL_LOCALHOST_NOT_REAL } from "../../constants/constants";
import './CreateNewLink.css';
import GoToSecretUrlAnchor from "../../Components/Buttons/GoToSecretUrlAnchor/GoToSecretUrlAnchor";

const CreateNewLink = () => {

  const [baseUrl, setBaseUrl] = useState('');
  const [createdLink, setCreatedLink] = useState<CreateLinkResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (baseUrl.length < MIN_URL_LENGTH) {
      alert(`URL must be at least ${MIN_URL_LENGTH} characters long.`);
      return;
    }

    const response = await postCreateLink(baseUrl) as CreateLinkResponse;

    if (!response) {
      alert(`Failed to create link. Please try again.`);
      return;
    }
    setCreatedLink(response);
    setBaseUrl('');
  };

  return (
    <>
      <div className="container create-new-link">
        {!createdLink && (
          <>
            <h1>Create New Link</h1>
            <form
              className="create-new-link-form"
              onSubmit={handleSubmit}
            >
              <div className="create-new-link-url-group">
                <label htmlFor="url">Enter URL:</label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  placeholder="https://example.com"
                  required
                  value={baseUrl}
                  minLength={MIN_URL_LENGTH}
                  onChange={(e) => setBaseUrl(e.target.value)} />
              </div>
              <div className="create-new-link-btn-group">
                <BackToHome />
                <button type="submit">Create Link</button>
              </div>
            </form>
          </>)}
        {createdLink && (
          <Suspense fallback={<div className="create-new-link">Loading...</div>}>
            <div>
              <h1>Link Created Successfully!</h1>
              <h2>Original URL: {createdLink?.originalURL}</h2>
              <p>Short URL: <GoToShortUrlAnchor displayName={`${SERVER_URL_LOCALHOST_NOT_REAL}/${createdLink?.shortURL}`} location={`${createdLink?.shortURL}`} /></p>
              <p>Secret URL: <GoToSecretUrlAnchor displayName={`${SERVER_URL_LOCALHOST_NOT_REAL}/${createdLink?.secretURL}`} location={`${createdLink?.secretURL}`} /></p>
            </div>
            <div className="create-new-link-btn-group">
              <BackToHome />
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
}
export default CreateNewLink;