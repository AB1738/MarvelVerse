import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import Search from "./Search";
import "../css/Cardgrid.css";
import Pagination from "./Pagination";

const Cardgrid = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [charQuery, setCharQuery] = useState();
  const [charInfo, setCharinfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Keep track of the current page
  const [currentQueryPage, setCurrentQueryPage] = useState(1); // Keep track of the current page
  const [limit, setLimit] = useState(20); // Set the number of items per page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages (for pagination control)
  const [totalQueryPages, setTotalQueryPages] = useState(0); // Total number of pages (for pagination control)
  const [isStandardPagination, setIsStandardPagination] = useState(true);

  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      const fetchQueriedChars = async () => {
        if (isStandardPagination) {
          setIsStandardPagination((val) => !val);
        }
        const offset = (currentQueryPage - 1) * limit;
        const response = await fetch(
          `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&nameStartsWith=${charQuery}&apikey=${apiKey}`
        );
        const data = await response.json();
        const characters = data.data.results;
        setCharinfo(characters);
        setIsLoading(false);
        const totalCount = data.data.total;
        setTotalQueryPages(Math.ceil(totalCount / limit));
      };
      fetchQueriedChars();
    } else {
      // firstRender.current=true//works without strict mode
      setTimeout(() => (firstRender.current = true), 1000); //works with strict mode
    }
  }, [charQuery, currentQueryPage]);

  useEffect(() => {
    const fetchCharacters = async () => {
      if (!isStandardPagination) {
        setIsStandardPagination((val) => !val);
      }
      const offset = (currentPage - 1) * limit;
      const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&apikey=${apiKey}`
      );
      const data = await response.json();
      const characters = data.data.results;
      setCharinfo(characters);
      setIsLoading(false);
      const totalCount = data.data.total;
      setTotalPages(Math.ceil(totalCount / limit));
    };
    fetchCharacters();
  }, [currentPage]);

  const nextPage = () => {
    if (isStandardPagination) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        setIsLoading(true);
      }
    } else if (currentQueryPage < totalQueryPages) {
      setCurrentQueryPage(currentQueryPage + 1);
      setIsLoading(true);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (isStandardPagination) {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        setIsLoading(true);
      }
    } else if (currentQueryPage > 1) {
      setCurrentQueryPage(currentQueryPage - 1);
      setIsLoading(true);
    }
  };

  return (
    <main className="container">
      <Search setCharQuery={setCharQuery} />
      <div className="card-grid">
        {isLoading ? (
          <h1 className="loader">Loading...</h1>
        ) : charInfo.length > 0 ? (
          charInfo.map((character) => {
            return <Card key={character.id} character={character} />;
          })
        ) : (
          <h1 className="loader">Character not found</h1>
        )}
      </div>

      {isStandardPagination ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      ) : (
        <Pagination
          currentPage={currentQueryPage}
          totalPages={totalQueryPages}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </main>
  );
};

export default Cardgrid;
