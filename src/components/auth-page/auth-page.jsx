import React, {Fragment, useState} from "react";
import PropTypes from "prop-types";
import {AppPages} from "../../const";
import Header from "../header/header";
import Footer from "../footer/footer";
import {connect} from "react-redux";
import {AuthorizationStatus, AppRoute} from "../../const";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import {login as userLogin} from "../../store/api-actions";
import {Redirect} from "react-router-dom";

const AuthPage = (props) => {
  const {authorized, onUserLogin} = props;

  const [login, setLogin] = useState(``);
  const [password, setPassword] = useState(``);
  const [isInvalidLogin, setIsInvalidLogin] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const _handleSubmit = (evt) => {
    evt.preventDefault();

    const regex = RegExp(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i);

    const invalidLogin = !login || !regex.test(login);
    const invalidPassword = !password;

    if (!invalidLogin && !invalidPassword) {
      onUserLogin({login, password});
    } else {
      setIsInvalidLogin(invalidLogin);
      setIsInvalidPassword(invalidPassword);
    }
  };

  const _handleChangeLogin = (evt) => {
    setLogin(evt.target.value);
  };

  const _handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

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
                  <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" onChange={_handleChangeLogin} autoFocus />
                  <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
                </div>
                <div className={`sign-in__field ${isInvalidPassword ? `sign-in__field--error` : ``}`}>
                  <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" onChange={_handleChangePassword} />
                  <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
                </div>
              </div>
              <div className="sign-in__submit">
                <button className="sign-in__btn" type="submit" onClick={_handleSubmit}>Sign in</button>
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
