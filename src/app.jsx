import Header from "./components/Header";
import Nav from "./components/Nav";
import Stories from "./components/Stories";
import { useState, useEffect } from "preact/hooks";

const NAVITEMS = ["arts", "books", "fashion", "food", "movies", "travel"];
const FETCH_URL = "https://api.nytimes.com/svc/topstories/v2/";
const NYT_API = "PGQuh0auTqHC6HEx4gADBhT2yLCdXYbN";

export function App() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("arts"); // Default section

  useEffect(() => {
    const url = new URL(window.location.href);
    const hash = url.hash.slice(1);
    if (hash !== "") {
      setActiveSection(hash);
    }
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${FETCH_URL}${activeSection}.json?api-key=${NYT_API}`
        );
        const data = await response.json();
        setStories(data.results);
        localStorage.setItem(activeSection, JSON.stringify(data.results));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    if (!localStorage.getItem(activeSection)) {
      fetchStories();
    } else {
      setStories(JSON.parse(localStorage.getItem(activeSection)));
    }
  }, [activeSection]);

  return (
    <>
      <Header siteTitle="All the News That Fits We Print" />
      <Nav
        navItems={NAVITEMS}
        setSection={setActiveSection}
        section={activeSection}
      />
      {loading ? <h2>Loading...</h2> : <Stories stories={stories} />}
    </>
  );
}
