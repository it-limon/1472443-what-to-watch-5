import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";

class CatalogMoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeMovieCard: -1}
  }

  render() {
    const movies = this.props.movies;

    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => (
          <SmallMovieCard
            key={movie.id}
            movie={movie}
            onActiveMovieCardChange={(movieId) => {
              this.setState(() => ({activeMovieCard: movieId}))
            }}
          />
        ))}
      </div>
    );
  }
}

export default CatalogMoviesList;
