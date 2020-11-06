import {extend} from "../../../utils";
import {ActionType} from "../../action";
import allReviews from "../../../mocks/reviews";

const initialState = {
  movies: [],
  reviews: allReviews
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
  }

  return state;
};
