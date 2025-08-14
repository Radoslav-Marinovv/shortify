import { Suspense, useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getSecretUrl, type GetSecretUrl } from "../../utils/services/link.service";

import BackToHomeButton from "../../Components/Buttons/BackToHomeButton/BackToHomeButton";

const Secret = () => {
  const navigate = useNavigate();
  const { secretURL } = useParams<{ secretURL: string }>();

  const [data, setData] = useState<GetSecretUrl>({
    originalURL: '',
    shortURL: '',
    visitorsIp: {},
  });

  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchData = async () => {
      if (!secretURL) {
        navigate('/', { replace: true });
        return;
      }
      try {
        const URL = await getSecretUrl(secretURL);
        setData({
          originalURL: URL.originalURL,
          shortURL: URL.shortURL,
          visitorsIp: Array.isArray(URL.visitorsIp)
            ? URL.visitorsIp.reduce<{ [key: string]: number }>((acc, curr) => {
              acc[curr.key] = curr.value;
              return acc;
            }, {})
            : URL.visitorsIp
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [secretURL, navigate]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Secret Page</h1>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <div>
          <h2>Original URL:</h2>
          <p>{data.originalURL}</p>
          <h2>Short URL:</h2>
          <p>{data.shortURL}</p>
          <h2>Visitors IP:</h2>
          <ul>
            {Object.entries(data.visitorsIp).map(([ip, count]) => (
              <li key={ip}>
                {ip}: {count}
              </li>
            ))}
          </ul>
        </div>
      </Suspense>
      <BackToHomeButton />
    </div>
  );
};

export default Secret;
