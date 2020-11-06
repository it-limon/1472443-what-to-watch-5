import {combineReducers} from "redux";
import {appData} from "./reducers/data-reducer";
import {appState} from "./reducers/state-reducer";
import {appUser} from "./reducers/user-reducer";

export const NameSpace = {
  DATA: `DATA`,
  STATE: `STATE`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.STATE]: appState,
  [NameSpace.USER]: appUser
});
