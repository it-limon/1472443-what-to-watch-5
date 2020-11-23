import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {getLastActiveMovie} from "../../store/selectors/state-selector";
import {connect} from "react-redux";
import Props from "../../props";

const Breadcrumbs = (props) => {
  const {movie} = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.FILMS}/${movie.id}`} className="breadcrumbs__link">
            {movie.name}
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
  movie: Props.movie
};

const mapStateToProps = (state) => ({
  movie: getLastActiveMovie(state)
});

export {Breadcrumbs};
export default connect(mapStateToProps)(Breadcrumbs);