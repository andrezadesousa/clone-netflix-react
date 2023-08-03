/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import './App.css'
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";

export default () => {

  //Lista para ser exibida
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      console.log(list)
    }

    loadAll();
  }, []);

  return(
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow 
            key={key} 
            title={item.title}
            items={item.items} />
        ))}
      </section>
    </div>
  )
};
