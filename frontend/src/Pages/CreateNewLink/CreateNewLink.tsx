import { useState } from "react";

import BackToHome from "../../Components/Buttons/BackToHomeButton/BackToHomeButton";

import { postCreateLink } from "../../utils/services/link.service";
import { MIN_URL_LENGTH } from "../../constants/constants";
import './CreateNewLink.css';

const CreateNewLink = () => {

  const [baseUrl, setBaseUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (baseUrl.length < MIN_URL_LENGTH) {
      alert(`URL must be at least ${MIN_URL_LENGTH} characters long.`);
      return;
    }

    const response = await postCreateLink(baseUrl);

    if (!response) {
      alert(`Failed to create link. Please try again.`);
      return;
    }
    setBaseUrl('');
  };

  return (
    <>
      <div className="container create-new-link">
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
      </div>
    </>
  );
}
export default CreateNewLink;