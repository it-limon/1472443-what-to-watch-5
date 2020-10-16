import React, {PureComponent} from "react";
import SmallMovieCard from "../small-movie-card/small-movie-card";

class CatalogMoviesList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {activeMovieCard: -1}
  }

  render() {
    return (
      <div className="catalog__movies-list">
        <SmallMovieCard
          movies={this.props.movies}
          onActiveMovieCardChange={(movieId) => {
            this.setState(() => ({activeMovieCard: movieId}))
          }}
        />
      </div>
    );
  }
}

export default CatalogMoviesList;
