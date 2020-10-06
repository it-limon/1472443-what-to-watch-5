import React from "react";
import PropTypes from "prop-types";
import MainPage from "../main-page/main-page";

const App = (props) => {
  return (
    <MainPage promoMovieProps={props.promoMovieProps}/>
  );
};

App.propTypes = {
  promoMovieProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.oneOf([`Comedie`, `Crime`, `Documentary`, `Drama`, `Horror`, `Kids & Family`, `Romance`, `Sci-Fi`, `Thriller`]).isRequired,
    releaseYear: PropTypes.number.isRequired
  }).isRequired
};

export default App;
