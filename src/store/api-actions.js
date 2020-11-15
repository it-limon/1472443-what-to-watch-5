import {DataActionCreator} from "./actions/data-action";
import {StateActionCreator} from "./actions/state-action";
import {UserActionCreator} from "./actions/user-action";
import {AuthorizationStatus} from "../const";

export const loadMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(DataActionCreator.loadMovies(data)))
);

export const loadCommentsList = (movieId, setIsLoading) => (dispatch, _getState, api) => (
  api.get(`/comments/${movieId}`)
    .then(({data}) => {
      dispatch(DataActionCreator.loadComments(data));
      setIsLoading(false);
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(({data}) => dispatch(UserActionCreator.setUserInfo(data)))
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(({data}) => dispatch(UserActionCreator.setUserInfo(data)))
    .then(() => dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(StateActionCreator.redirectToRoute(`/`)))
);
