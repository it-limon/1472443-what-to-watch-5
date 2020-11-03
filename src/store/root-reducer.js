import {combineReducers} from "redux";
import {appData} from "./reducers/app-data/app-data";
import {appState} from "./reducers/app-state/app-state";
import {appUser} from "./reducers/app-user/app-user";

export const NameSpace = {
  APP_DATA: `APP_DATA`,
  APP_STATE: `APP_STATE`,
  APP_USER: `APP_USER`
};

export default combineReducers({
  [NameSpace.APP_DATA]: appData,
  [NameSpace.APP_STATE]: appState,
  [NameSpace.APP_USER]: appUser
});
