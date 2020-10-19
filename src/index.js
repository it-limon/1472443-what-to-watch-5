import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import movies from "./mocks/movies";

const PromoMovie = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseYear: 2014
};

ReactDOM.render(
    <App
      promoMovie={PromoMovie}
      movies={movies}
    />,
    document.querySelector(`#root`)
);
