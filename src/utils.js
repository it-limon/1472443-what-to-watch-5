import {REVIEW_COLUMNS_COUNT, ALL_GENRES_KEY} from "./const/const";
import {MovieGenresList} from "../src/const/movie-genres-list.const";

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
  return MovieGenresList.filter((genre) => genre.key === genreKey)[0].name;
};

export const getFilteredMovies = (movies, genreKey) => {
  if (genreKey === ALL_GENRES_KEY) {
    return movies;
  } else {
    return movies.filter((currMovie) => currMovie.genreKey === genreKey);
  }
};
