import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {composeWithDevTools} from "redux-devtools-extension";
import {redirect} from "./store/middlewares/redirect";

import {loadMoviesList, checkAuth} from "./store/api-actions";

import {UserActionCreator} from "./store/actions/user-action";
import {StateActionCreator} from "./store/actions/state-action";

import rootReducer from "./store/root-reducer";

import {AuthorizationStatus, LoadingStatus} from "./const";

const api = createAPI(
    () => store.dispatch(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

Promise.all([
  store.dispatch(loadMoviesList()),
  store.dispatch(checkAuth())
])
.then(() => store.dispatch(StateActionCreator.setLoadingStatus(LoadingStatus.COMPLETED)));

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
