import MockAdapter from "axios-mock-adapter";
import {appUser} from "./user-reducer";
import {UserActionType} from "../actions/user-action";
import {AuthorizationStatus, APIRoute} from "../../const";
import {testUser} from "../../test-dataset/test-user";
import {checkAuth, login} from "../api-actions";
import {createAPI} from "../../services/api";

const api = createAPI(() => {}, () => {});

it(`User reducer without additional parameters should return initial state`, () => {
  expect(appUser(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    userInfo: {}
  });
});

it(`Reducer should update authorization status`, () => {
  expect(appUser({
    authorizationStatus: AuthorizationStatus.NO_AUTH
  }, {
    type: UserActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH
  });
});

it(`Reducer should update user info`, () => {
  expect(appUser({
    userInfo: {}
  }, {
    type: UserActionType.SET_USER_INFO,
    payload: testUser
  })).toEqual({
    userInfo: testUser
  });
});

describe(`Async user operations work correctly`, () => {

  it(`Should make a correct API call to /login GET`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {fake: true});

    const authChecker = checkAuth();

    return authChecker(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_USER_INFO,
          payload: {fake: true},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
      });
  });

  it(`Should make a correct API call to /login POST`, () => {
    const dispatch = jest.fn();

    const apiMock = new MockAdapter(api);
    apiMock
      .onPost(APIRoute.LOGIN, {email: `user@mail.ru`, password: `1234`})
      .reply(200, {fake: true});

    const loginer = login({login: `user@mail.ru`, password: `1234`});

    return loginer(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);

        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: UserActionType.SET_USER_INFO,
          payload: {fake: true},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: UserActionType.REQUIRED_AUTHORIZATION,
          payload: AuthorizationStatus.AUTH
        });
      });
  });
});
