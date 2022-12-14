export const selectUserName = state => state.authorization.userInfo.username;
export const selectUserEmail = state => state.authorization.userInfo.email;
export const selectUserToken = state => state.authorization.userToken;
export const selectUserBalance = state => state.authorization.userInfo.balance;
export const selectIsLoggedIn = state => state.authorization.isAuthentication;
