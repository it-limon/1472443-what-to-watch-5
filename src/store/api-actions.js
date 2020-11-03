import {ActionCreator} from "./action";
import {AuthorizationStatus, LoadingStatus} from "../const";

export const fetchMoviesList = () => (dispatch, _getState, api) => {
  api.get(`/films`)
    .then(({data}) => {
      dispatch(ActionCreator.loadMovies(data));
      dispatch(ActionCreator.setLoadingStatus(LoadingStatus.COMPLETED));
    });
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(`/login`, {email, password})
    .then(() => dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.AUTH)))
);
