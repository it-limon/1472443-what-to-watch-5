import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {AppPages} from "../../const";
import Header from "../header/header";
import Footer from "../footer/footer";

const AuthPage = (props) => {
  const {loginRef, passwordRef, isInvalidLogin, isInvalidPassword, onSubmit} = props;

  return (
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
            <button className="sign-in__btn" type="submit" onClick={onSubmit}>Sign in</button>
          </div>
        </form>
      </div>

      <Footer
        currentPage={AppPages.AUTH}
      />
    </div>
  );
};

AuthPage.propTypes = {
  loginRef: PropTypes.object.isRequired,
  passwordRef: PropTypes.object.isRequired,
  isInvalidLogin: PropTypes.bool.isRequired,
  isInvalidPassword: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AuthPage;
