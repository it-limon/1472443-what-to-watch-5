import {MovieRating, REVIEW_COLUMNS_COUNT, ALL_GENRES_KEY} from "./const";
import genres from "../src/genres";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

// Возвращает массив, где отызвы разбиты на подмассивы (колонки) для страницы отзывов фильма
export const getReviewsPerColumns = (reviews, movieKey) => {
  reviews = reviews.filter((review) => review.movieKey === movieKey);
  reviews.sort((a, b) => a.date - b.date);

  const reviewsCountInColumn = Math.ceil(reviews.length / REVIEW_COLUMNS_COUNT);
  const reviewsPerColumns = [];
  let j = 0;

  for (let i = 0; i < REVIEW_COLUMNS_COUNT; ++i) {
    const column = reviews.slice(j, j + reviewsCountInColumn);

    if (column.length > 0) {
      reviewsPerColumns[i] = column;
    } else {
      break;
    }

    j = j + reviewsCountInColumn;
  }

  return reviewsPerColumns;
};

export const getGenreNameByKey = (genreKey) => {
  return genres.filter((genre) => genre.key === genreKey).shift().name;
};

export const getFilteredMoviesByGenre = (movies, genreKey) => {
  if (genreKey === ALL_GENRES_KEY) {
    return movies;
  } else {
    return movies.filter((currMovie) => currMovie.genreKey === genreKey);
  }
};

export const getRatingNameByRating = (rating) => {
  if (rating < 3) {
    return MovieRating.BAD;
  } else if (rating >= 3 && rating < 5) {
    return MovieRating.NORMAL;
  } else if (rating >= 5 && rating < 8) {
    return MovieRating.GOOD;
  } else if (rating >= 8 && rating < 10) {
    return MovieRating.VERY_GOOD;
  } else if (rating === 10) {
    return MovieRating.AWESOME;
  } else {
    return ``;
  }
};
