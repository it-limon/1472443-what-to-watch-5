import {NameSpace} from "../root-reducer";

export const getAuthorizationStatus = (state) => state[NameSpace.USER].authorizationStatus;
export const getUserInfo = (state) => state[NameSpace.USER].userInfo;
