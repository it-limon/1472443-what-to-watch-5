import React from "react";
import {Link} from "react-router-dom";
import {getMovieById} from "../../store/selectors/data-selector";
import PropTypes from "prop-types";
import Props from "../../props";
import {connect} from "react-redux";
import {AppRoute} from "../../const";

const Breadcrumbs = (props) => {
  const {id, name} = props.movie;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.FILMS}/${id}`} className="breadcrumbs__link">
            {name}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  )
};

Breadcrumbs.propTypes = {
  movie: Props.movie,
  movieId: PropTypes.number.isRequired
};

const mapStateToProps = (state, props) => ({
  movie: getMovieById(state, props.movieId)
});

export {Breadcrumbs};
export default connect(mapStateToProps)(Breadcrumbs);
