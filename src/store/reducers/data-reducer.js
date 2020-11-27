import {extend} from "../../utils";
import {DataActionType} from "../actions/data-action";

const initialState = {
  promoMovie: {
    id: -1,
    name: ``,
    posterImage: ``,
    previewImage: ``,
    backgroundImage: ``,
    backgroundColor: ``,
    videoLink: ``,
    previewVideoLink: ``,
    description: ``,
    rating: 0,
    scoresCount: 0,
    director: ``,
    starring: [],
    runTime: 0,
    genre: ``,
    released: 0,
    isFavorite: false
  },
  movies: [],
  favoriteMovies: [],
  comments: []
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case DataActionType.LOAD_PROMO_MOVIE:
      return extend(state, {
        promoMovie: action.payload
      });
    case DataActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case DataActionType.LOAD_FAVORITE_MOVIES:
      return extend(state, {
        favoriteMovies: action.payload
      });
    case DataActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload
      });
  }

  return state;
};
