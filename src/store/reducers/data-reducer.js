import {extend} from "../../utils";
import {DataActionType} from "../actions/data-action";

const initialState = {
  movies: [],
  comments: []
};

export const appData = (state = initialState, action) => {
  switch (action.type) {
    case DataActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload
      });
    case DataActionType.LOAD_COMMENTS:
      return extend(state, {
        comments: action.payload
      });
  }

  return state;
};
