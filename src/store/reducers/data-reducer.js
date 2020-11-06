import {extend} from "../../utils";
import {DataActionType} from "../actions/data-action";
import allReviews from "../../mocks/reviews";

const initialState = {
  movies: [],
  reviews: allReviews
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case DataActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
  }

  return state;
};
