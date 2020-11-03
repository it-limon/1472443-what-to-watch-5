import {combineReducers} from "redux";
import {appData} from "./reducers/app-data/app-data";
import {appState} from "./reducers/app-state/app-state";
import {user} from "./reducers/user/user";

export const NameSpace = {
  DATA: `DATA`,
  STATE: `STATE`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: appData,
  [NameSpace.STATE]: appState,
  [NameSpace.USER]: user
});
