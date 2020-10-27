import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app";
import movies from "./mocks/movies";
import reviews from "./mocks/reviews";
import {reducer} from "./store/reducer";

const PromoMovie = {
  name: `The Grand Budapest Hotel`,
  genreKey: 4,
  releaseYear: 2014
};

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

ReactDOM.render(
    <Provider store={store}>
      <App
        promoMovie={PromoMovie}
        movies={movies}
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
