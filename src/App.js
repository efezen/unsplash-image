import "./App.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import Photo from "./Photos/Photo";

const clientID = `?client_id= API_KEY`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false); //loading
  const [photos, setPhotos] = useState([]); //photos
  const [page, setPage] = useState(1); //pages
  const [query, setQuery] = useState(""); //query

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhoto) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return { ...oldPhoto, ...data.results };
        } else {
          return { ...oldPhoto, ...data };
        }
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
    useEffect(()=>{
      fetchImages()
    }, [page])
  
  return (
    <main>
      <section className="search">
        <form className="search-form" action="">
          <input type="text" placeholder="search" className="form-input" />
          <button type="submit" className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((image, index) => {
            return <Photo key={index} {...image} />;
          })}
        </div>
      </section>
    </main>
  );
}

export default App;
