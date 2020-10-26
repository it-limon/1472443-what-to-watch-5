import React from "react";
import {MovieGenresList} from "../../const/movie-genres-list.const";

const GenresList = (props) => {
  const {activeIndex, onChangeActiveIndex} = props;

  return (
    <ul className="catalog__genres-list">
      {MovieGenresList.map((genre) => (
      <li
        key={genre.key}
        className={`catalog__genres-item ${(genre.key === activeIndex) ? `catalog__genres-item--active` : ``}`}
        onClick={(evt) => {
          evt.preventDefault();
          onChangeActiveIndex(genre.key);
        }}
      >
        <a href="#" className="catalog__genres-link">{genre.filterName}</a>
      </li>
      ))}
    </ul>
  );
};

export default GenresList;
