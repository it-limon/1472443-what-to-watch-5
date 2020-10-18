import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import SmallMovieCard from "../small-movie-card/small-movie-card";
import Props from "../../props";

class CatalogMoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeMovieCard: -1};
  }

  render() {
    const {movies, onSmallMovieCardClick} = this.props;


    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.key}
            movie={movie}
            onActiveMovieCardChange={(movieKey) => {
              this.setState(() => ({activeMovieCard: movieKey}));
            }}
            onSmallMovieCardClick={onSmallMovieCardClick}
          />
        ))}
      </div>
    );
  }
}

CatalogMoviesList.propTypes = {
  movies: PropTypes.arrayOf(Props.movie).isRequired,
  onSmallMovieCardClick: PropTypes.func.isRequired
};

export default CatalogMoviesList;
