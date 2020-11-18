import React from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {AppRoute} from "../../const";

const Breadcrumbs = (props) => {
  const {movieId, movieName} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.FILMS}/${movieId}`} className="breadcrumbs__link">
            {movieName}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  movieId: PropTypes.number.isRequired,
  movieName: PropTypes.string.isRequired
};

export default Breadcrumbs;
