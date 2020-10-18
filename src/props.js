import PropTypes from "prop-types";
import {MovieGenre, MovieRating} from "../src/const";

const Props = {
  promoMovie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(MovieGenre).isRequired,
    releaseYear: PropTypes.number.isRequired
  }).isRequired,

  movie: PropTypes.shape({
    key: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(MovieGenre).isRequired,
    releaseYear: PropTypes.number.isRequired,
    runTime: PropTypes.string.isRequired,

    rating: PropTypes.string.isRequired,
    ratingDesc: PropTypes.oneOf(MovieRating).isRequired,
    votesNumber: PropTypes.number.isRequired,

    annotation: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired,

    previewImg: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
  }).isRequired,

  review: PropTypes.shape({
    key: PropTypes.number.isRequired,
    movieKey: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }).isRequired
};

export default Props;
