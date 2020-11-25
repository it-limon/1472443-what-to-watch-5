import React, {Fragment, useRef, useState} from "react";
import PropTypes from "prop-types";
import {AppPages} from "../../const";
import Header from "../header/header";
import Footer from "../footer/footer";
import {connect} from "react-redux";
import {AuthorizationStatus, AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import {login as userLogin} from "../../store/api-actions";

const AuthPage = (props) => {
  const {authorized, onUserLogin} = props;

  const loginRef = useRef(null);
  const passwordRef = useRef(null);
  
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const _handleSubmit = (evt) => {
    evt.preventDefault();

    const loginInput = loginRef.current;
    const login = loginInput.value;

    const passwordInput = passwordRef.current;
    const password = passwordInput.value;

    const regex = RegExp(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i);

    const isInvalidLogin = !login || !regex.test(login);
    const isInvalidPassword = !password;

    if (isInvalidLogin) {
      loginInput.focus();
    }

    if (isInvalidPassword && !isInvalidLogin) {
      passwordInput.focus();
    }

    setIsInvalidLogin(isInvalidLogin);
    setIsInvalidPassword(isInvalidPassword);

    if (!isInvalidLogin && !isInvalidPassword) {
      onUserLogin({login, password});
    }
  }

  return (
    <Fragment>
      {authorized ?
        <Redirect to={AppRoute.MAIN} /> :
        <div className="user-page">
          <Header
            currentPage={AppPages.AUTH}
          />

          <div className="sign-in user-page__content">
            <form action="#" className="sign-in__form">
              {(isInvalidLogin || isInvalidPassword) &&
                <div className="sign-in__message">
                  <p>{isInvalidLogin && `Please enter a valid email address`}</p>
                  <p>{isInvalidPassword && `Please enter a valid password`}</p>
                </div>}
              <div className="sign-in__fields">
                <div className={`sign-in__field ${isInvalidLogin ? `sign-in__field--error` : ``}`}>
                  <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" ref={loginRef} autoFocus />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className={`sign-in__field ${isInvalidPassword ? `sign-in__field--error` : ``}`}>
                  <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" ref={passwordRef} />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit" onClick={(evt) => _handleSubmit(evt)}>Sign in</button>
              </div>
            </form>
          </div>

          <Footer
            currentPage={AppPages.AUTH}
          />
        </div>
      }
    </Fragment>
  );
};

AuthPage.propTypes = {
  authorized: PropTypes.bool.isRequired,
  onUserLogin: PropTypes.func.isRequired
};

export {AuthPage};

const mapStateToProps = (state) => ({
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH
});

const mapDispatchToProps = (dispatch) => ({
  onUserLogin(userInfo) {
    dispatch(userLogin(userInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);