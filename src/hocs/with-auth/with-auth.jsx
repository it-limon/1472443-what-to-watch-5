import React, {PureComponent, createRef} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {login as userLogin} from "../../store/api-actions";

export const withAuth = (Component) => {
  class WithAuth extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        _isInvalidLogin: false,
        _isInvalidPassword: false
      };

      this._loginRef = createRef();
      this._passwordRef = createRef();

      this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(evt) {
      evt.preventDefault();

      const loginInput = this._loginRef.current;
      const login = loginInput.value;

      const passwordInput = this._passwordRef.current;
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

      this.setState({_isInvalidLogin: isInvalidLogin});
      this.setState({_isInvalidPassword: isInvalidPassword});

      if (!isInvalidLogin && !isInvalidPassword) {
        this.props.onUserLogin({login, password});
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          loginRef={this._loginRef}
          passwordRef={this._passwordRef}
          isInvalidLogin={this.state._isInvalidLogin}
          isInvalidPassword={this.state._isInvalidPassword}
          onSubmit={this._handleSubmit}
        />
      );
    }
  }

  WithAuth.propTypes = {
    onUserLogin: PropTypes.func.isRequired
  };

  return connect(null, mapDispatchToProps)(WithAuth);
};

const mapDispatchToProps = (dispatch) => ({
  onUserLogin(userInfo) {
    dispatch(userLogin(userInfo));
  }
});
