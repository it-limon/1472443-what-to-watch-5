import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reviews from "./mocks/reviews";
import rootReducer from "./store/root-reducer";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {UserActionCreator} from "./store/actions/user-action";
import {AuthorizationStatus, LoadingStatus} from "./const";
import {composeWithDevTools} from "redux-devtools-extension";
import {fetchMoviesList, checkAuth} from "./store/api-actions";
import {StateActionCreator} from "./store/actions/state-action";
import {redirect} from "./store/middlewares/redirect";

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
  store.dispatch(fetchMoviesList()),
  store.dispatch(checkAuth())
])
.then(() => store.dispatch(StateActionCreator.setLoadingStatus(LoadingStatus.COMPLETED)));

ReactDOM.render(
    <Provider store={store}>
      <App
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
