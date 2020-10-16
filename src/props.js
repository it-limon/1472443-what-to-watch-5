import PropTypes from "prop-types";
import {MovieGenre} from "../src/const";

const Props = {
  promoMovie: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.oneOf(MovieGenre).isRequired,
    releaseYear: PropTypes.number.isRequired
  }).isRequired,

  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
    cardImg: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,

    rating: 6.6,
    ratingName: `Very good`,
    ratingsCount: 5,
    annotation: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.string.isRequired,
  }).isRequired
};

export default Props;
