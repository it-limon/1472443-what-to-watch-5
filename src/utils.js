import {MovieRating, MAX_REVIEWS_COLUMNS_COUNT} from "./const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

// Возвращает массив, где отызвы разбиты на подмассивы (колонки) для страницы отзывов фильма
export const getReviewsPerColumns = (reviews, movieKey) => {
  reviews = reviews.filter((review) => review.movieKey === movieKey);
  reviews.sort((a, b) => a.date - b.date);

  const reviewsCountInColumn = Math.ceil(reviews.length / MAX_REVIEWS_COLUMNS_COUNT);
  const reviewsPerColumns = [];
  let j = 0;

  for (let i = 0; i < MAX_REVIEWS_COLUMNS_COUNT; ++i) {
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

export const getReviewsByMovie = (reviews, movieKey) => {
  return reviews.filter((currReview) => currReview.movieKey === movieKey);
};

export const toStandardKeys = (obj) => {
  let newObj;

  if (obj instanceof Array) {
    return obj.map((it) => {
      if (typeof it === `object`) {
        it = toStandardKeys(it);
      }

      return it;
    });
  } else {
    newObj = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = key.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase());

        let value = obj[key];

        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = toStandardKeys(value);
        }

        newObj[newKey] = value;
      }
    }
  }

  return newObj;
};

export const getRatingName = (rating) => {
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

export const getTimeFromMins = (mins) => {
  let mm = mins % 60;
  let hh = (mins - mm) / 60;

  return hh + `h ` + mm + `m`;
};
