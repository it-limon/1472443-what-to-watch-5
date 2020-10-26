import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";
import movies from "./mocks/movies";
import reviews from "./mocks/reviews";

const PromoMovie = {
  name: `The Grand Budapest Hotel`,
  genre: `Drama`,
  releaseYear: 2014
};

ReactDOM.render(
    <App
      promoMovie={PromoMovie}
      movies={movies}
      reviews={reviews}
    />,
    document.querySelector(`#root`)
);
