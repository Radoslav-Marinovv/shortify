import { Suspense, useLayoutEffect, useState } from "react";

import { SERVER_URL_LOCALHOST_NOT_REAL } from "../../constants/constants";
import type { CreateLinkResponse } from "../../utils/services/link.service";

import Hero from "../../Components/Hero/Hero"
import GoToShortUrlAnchor from "../../Components/Buttons/GoToShortUrlAnchor/GoToShortUrlAnchor";
import GoToSecretUrlAnchor from "../../Components/Buttons/GoToSecretUrlAnchor/GoToSecretUrlAnchor";

const Index = () => {
  const [createdLinks, setCreatedLinks] = useState<CreateLinkResponse[]>([]);

  const handleDeleteStorageItem = (index: number) => {
    const updatedLinks = createdLinks.filter((_, i) => i !== index);
    setCreatedLinks(updatedLinks);
    localStorage.setItem('myLinks', JSON.stringify(updatedLinks));
  };

  useLayoutEffect(() => {
    const links = JSON.parse(localStorage.getItem('myLinks') || '[]') as CreateLinkResponse[];
    if (links) {
      setCreatedLinks(links);
    }
  }, []);
  return (
    <div className="container">
      <Hero />
      {createdLinks && createdLinks.length > 0 ? (
        <div>
          <h2>My Links:</h2>
          <ul>
            {createdLinks.map((link: any, index: number) => (
              <Suspense fallback={<div>Loading...</div>} key={index}>
                <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                  <h2>Original URL: <a href={`${link?.originalURL}`} target="_blank" className="pointer">{link?.originalURL}</a></h2>
                  <p>Short URL: <GoToShortUrlAnchor displayName={`${SERVER_URL_LOCALHOST_NOT_REAL}/${link?.shortURL}`} location={`${link?.shortURL}`} /></p>
                  <p>Secret URL: <GoToSecretUrlAnchor displayName={`${SERVER_URL_LOCALHOST_NOT_REAL}/${link?.secretURL}`} location={`${link?.secretURL}`} /></p>
                  <button onClick={() => handleDeleteStorageItem(index)}>Delete</button>
                </div>
              </Suspense>
            ))}
          </ul>
        </div>
      ) : (
        <h2>No links created yet.</h2>
      )
      }
    </div >
  )
}

export default Index