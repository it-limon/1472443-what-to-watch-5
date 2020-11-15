import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Props from "../../props";
import {getAuthorizationStatus, getUserInfo} from "../../store/selectors/user-selector";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {Link} from "react-router-dom";

const Header = (props) => {
  const {authorized, userInfo, headerClassName, withActiveMainLink} = props;

  const logoLetter = () => (
    <Fragment>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Fragment>
  );

  return (
    <header className={`page-header ${headerClassName}`}>
      <div className="logo">
        <Fragment>
          {withActiveMainLink ?
            <Link className="logo__link" to="/">
              {logoLetter()}
            </Link> :
            <div className="logo__link">
              {logoLetter()}
            </div>
          }
        </Fragment>
      </div>

      <div className="user-block">
        {authorized ?
          <Link to="/mylist">
            <div className="user-block__avatar">
              <img src={userInfo.avatarUrl} alt={userInfo.name} width="63" height="63" />
            </div>
          </Link> :
          <Link to="/login" className="user-block__link">
            Sign In
          </Link>
        }
      </div>
    </header>
  );
};

Header.defaultProps = {
  withActiveMainLink: true
};

Header.propTypes = {
  authorized: PropTypes.bool.isRequired,
  userInfo: Props.userInfo,
  headerClassName: PropTypes.string.isRequired,
  withActiveMainLink: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  userInfo: getUserInfo(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
