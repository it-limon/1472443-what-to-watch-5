import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app";

const PromoMovieProps = {
  name: `The Dark Knight`,
  genre: `Thriller`,
  releaseYear: 2014
};

ReactDOM.render(
    <App promoMovieProps={PromoMovieProps}/>,
    document.querySelector(`#root`)
);
