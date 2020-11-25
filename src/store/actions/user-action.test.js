import {UserActionType, UserActionCreator} from "../actions/user-action";
import {testUser} from "../../test-dataset/test-user";
import {AuthorizationStatus} from "../../const";

describe(`UserActionCreator work correctly`, () => {

  it(`Action creator for required authorization returns correct action`, () => {
    expect(UserActionCreator.requiredAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: UserActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH
    });
  });

  it(`Action creator for set user info returns correct action`, () => {
    expect(UserActionCreator.setUserInfo(testUser)).toEqual({
      type: UserActionType.SET_USER_INFO,
      payload: testUser
    });
  });

});
