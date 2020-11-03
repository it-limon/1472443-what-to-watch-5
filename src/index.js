import React from "react";
import ReactDOM from "react-dom";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import reviews from "./mocks/reviews";
import rootReducer from "./store/root-reducer";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import {fetchMoviesList, checkAuth} from "./store/api-actions";
import {ActionCreator} from "./store/action";
import {AuthorizationStatus} from "./const";
import {composeWithDevTools} from "redux-devtools-extension";

const api = createAPI(
    () => store.dispatch(ActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

Promise.all([
  store.dispatch(fetchMoviesList()),
  store.dispatch(checkAuth())
])
.then(() => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          reviews={reviews}
        />
      </Provider>,
      document.querySelector(`#root`)
  );
});
