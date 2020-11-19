import {DataActionCreator} from "./actions/data-action";
import {StateActionCreator} from "./actions/state-action";
import {UserActionCreator} from "./actions/user-action";
import {AuthorizationStatus, AppRoute, APIRoute} from "../const";
import {getPromoMovie} from "./selectors/data-selector";
import {getLastActiveMovie} from "./selectors/state-selector";

export const loadMovie = (movieId, setIsLoading) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${movieId}`)
    .then(({data}) => dispatch(StateActionCreator.setLastActiveMovie(data)))
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
);

export const loadMoviePage = (movieId, setIsLoading) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}/${movieId}`)
    .then(({data}) => dispatch(StateActionCreator.setLastActiveMovie(data)))
    .then(() => dispatch(loadMoviesList()))
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
);

export const loadMainPage = (setIsLoading) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.PROMO_MOVIE}`)
    .then(({data}) => dispatch(DataActionCreator.loadPromoMovie(data)))
    .then(() => dispatch(loadMoviesList()))
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
);

export const loadMoviesList = () => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}`)
    .then(({data}) => dispatch(DataActionCreator.loadMovies(data)))
    .catch(() => {})
);

export const loadFavoriteMoviesList = (setIsLoading) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FAVORITE_FILMS}`)
    .then(({data}) => dispatch(DataActionCreator.loadFavoriteMovies(data)))
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
);

export const loadCommentsList = (movieId) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}/${movieId}`)
    .then(({data}) => dispatch(DataActionCreator.loadComments(data)))
    .catch(() => {})
);

export const sendComment = (movieId, {movieRating: rating, movieComment: comment}, setErrorMsg) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${movieId}`, {rating, comment})
    .then(({data}) => dispatch(DataActionCreator.loadComments(data)))
    .then(dispatch(StateActionCreator.redirectToRoute(`${AppRoute.FILMS}/${movieId}`)))
    .catch((err) => setErrorMsg(err.message))
);

export const setFavoriteMovie = (movieId, status) => (dispatch, getState, api) => (
  api.post(`${APIRoute.FAVORITE_FILMS}/${movieId}/${status}`)
    .then(({data}) => {
      const lastActiveMovie = getLastActiveMovie(getState());
      const promoMovie = getPromoMovie(getState());

      if (movieId === lastActiveMovie.id) {
        dispatch(StateActionCreator.setLastActiveMovie(data));
      }

      if (movieId === promoMovie.id) {
        dispatch(DataActionCreator.loadPromoMovie(data));
      }
    })
    .catch(() => {})
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`${APIRoute.LOGIN}`)
    .then(({data}) => dispatch(UserActionCreator.setUserInfo(data)))
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.LOGIN}`, {email, password})
    .then(({data}) => dispatch(UserActionCreator.setUserInfo(data)))
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => dispatch(StateActionCreator.redirectToRoute(`${AppRoute.MAIN}`)))
);
