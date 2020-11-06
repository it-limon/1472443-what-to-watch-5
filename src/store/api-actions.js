import {DataActionCreator} from "./actions/data-action";
import {StateActionCreator} from "./actions/state-action";
import {UserActionCreator} from "./actions/user-action";
import {AuthorizationStatus} from "../const";

export const fetchMoviesList = () => (dispatch, _getState, api) => (
  api.get(`/films`)
    .then(({data}) => dispatch(DataActionCreator.loadMovies(data)))
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
