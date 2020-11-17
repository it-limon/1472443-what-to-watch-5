import {DataActionCreator} from "./actions/data-action";
import {UserActionCreator} from "./actions/user-action";
import {StateActionCreator} from "./actions/state-action";
import {AuthorizationStatus, AppRoute, APIRoute} from "../const";

export const loadMoviesList = () => (dispatch, _getState, api) => (
  api.get(`${APIRoute.FILMS}`)
    .then(({data}) => dispatch(DataActionCreator.loadMovies(data)))
    .catch(() => {})
);

export const loadPromoMovie = () => (dispatch, _getState, api) => (
  api.get(`${APIRoute.PROMO_MOVIE}`)
    .then(({data}) => dispatch(DataActionCreator.loadPromoMovie(data)))
    .catch(() => {})
);

export const loadCommentsList = (movieId, setIsLoading) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.COMMENTS}/${movieId}`)
    .then(({data}) => {
      dispatch(DataActionCreator.loadComments(data));
      setIsLoading(false);
    })
    .catch(() => {
      setIsLoading(false);
    })
);

export const sendComment = (movieId, {movieRating: rating, movieComment: comment}, setErrorMsg) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.COMMENTS}/${movieId}`, {rating, comment})
    .then(({data}) => {
      dispatch(DataActionCreator.loadComments(data));
      dispatch(StateActionCreator.redirectToRoute(`${AppRoute.FILMS}/${movieId}`));
    })
    .catch((err) => {
      setErrorMsg(err.message);
    })
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
    .catch(() => {})
);
