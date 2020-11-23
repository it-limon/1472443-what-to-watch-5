import {extend} from "../../utils";
import {AuthorizationStatus} from "../../const";
import {UserActionType} from "../actions/user-action";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userInfo: {}
};

export const appUser = (state = initialState, action) => {
  switch (action.type) {
    case UserActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload,
      });
    case UserActionType.SET_USER_INFO:
      return extend(state, {
        userInfo: action.payload
      });
  }

  return state;
};
