/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import './App.css'
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";

export default () => {

  //Lista para ser exibida
  const [movieList, setMovieList] = useState([])

  //Lista em destaque
  const [featuredData, setFeaturedData] = useState([0])

  //Aparecer ou não o background black ou não 
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      //console.log(list)
      
      //Pegar o filme em destaque (pegando o feature) 
      // Destaque - Pegando aleatoriamente da lista dos originais da netflix
      let originals = list.filter(i=>i.slug==='originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData(chosenInfo);

      console.log('AQUIIII', chosenInfo)
    }

    loadAll();
  }, []);

  //Evento de monitoramento da própria página
  useEffect(() => {

    //monitorar o scroll da tela. E quando estiver acima de alguma valor que eu queira, o blackHeader será setado como true
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else {
        setBlackHeader(false)
      }
    }

    //quando a tela tiver qualquer scroll, ele vai rodar a função scrollListener
    window.addEventListener('scroll', scrollListener);

    //remover o evento quando sair da página
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader} />

      <FeatureMovie item={featuredData} />

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow 
            key={key} 
            title={item.title}
            items={item.items} />
        ))}
      </section>

      <footer>
        Feito com 
        <span 
          role="img" 
          aria-label="coração">
            🧡
          </span> pela B7Web <br/>
          Direitors de imagem para NetFlix <br/>
          Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
      //Só pode aparecer quando lists não tiver nada
        <div className="loading">
          <img alt="Carregando" src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_960,c_limit/Netflix_LoadTime.gif"></img>
        </div>
      }
    </div>
  )
};
