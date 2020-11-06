export const UserActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  SET_USER_INFO: `SET_USER_INFO`,
};

export const UserActionCreator = {
  requiredAuthorization: (status) => ({
    type: UserActionType.REQUIRED_AUTHORIZATION,
    payload: status
  }),
  setUserInfo: (userInfo) => ({
    type: UserActionType.SET_USER_INFO,
    payload: userInfo
  })
};
