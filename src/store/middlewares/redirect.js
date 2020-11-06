import browserHistory from "../../browser-history";
import {StateActionType} from "../actions/state-action";

export const redirect = (_store) => (next) => (action) => {
  if (action.type === StateActionType.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
