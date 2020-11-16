import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus, getUserInfo} from "../../store/selectors/user-selector";
import {connect} from "react-redux";
import {AuthorizationStatus, AppPages, AppRoute} from "../../const";
import {Link} from "react-router-dom";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import Props from "../../props";

const Header = (props) => {
  const {authorized, userInfo, currentPage} = props;

  const withActiveLink = (currentPage !== AppPages.MAIN);
  const withBreadcrumbs = (currentPage === AppPages.REVIEW);
  const withHeaderText = (currentPage === AppPages.AUTH) || (currentPage === AppPages.MYLIST);
  const withUserBlock = currentPage !== AppPages.AUTH;
  const withActiveUserLink = currentPage !== AppPages.MYLIST;

  const logoClassName = withHeaderText ? `user-page__head` : `movie-card__head`;

  const logoLetter = () => (
    <Fragment>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Fragment>
  );

  const logoBlock = () => {
    if (withActiveLink) {
      return (
        <Link className="logo__link" to={AppRoute.MAIN}>
          {logoLetter()}
        </Link>
      )
    } else {
      return (
        <div className="logo__link">
          {logoLetter()}
        </div>
      )
    }
  };

  const breadcrumbsBlock = () => {
    if (withBreadcrumbs && props.breadcrumbsMovieId !== -1) {
      return (
        <Breadcrumbs
          movieId={props.breadcrumbsMovieId}
        />
      )
    }
  };

  const headerBlock = () => {
    if (withHeaderText) {
      return (
        <h1 className="page-title user-page__title">{(currentPage === AppPages.AUTH) ? `Sign in` : `My list`}</h1>
      )
    }
  };

  const user = () => {
    return (
      <div className="user-block__avatar">
        <img src={userInfo.avatarUrl} alt={userInfo.name} width="63" height="63" />
      </div>
    );
  };

  const userBlock = () => {
    if (withUserBlock) {
      if (authorized) {
          if (withActiveUserLink) {
            return (
              <Link to={AppRoute.MYLIST}>
                {user()}
              </Link>
            )
          } else {
            return user();
        }
      } else {
        return (
          <Link to={AppRoute.LOGIN} className="user-block__link">
            Sign In
          </Link>
        )
      }
    }
  };

  return (
    <header className={`page-header ${logoClassName}`}>
      <div className="logo">
        {logoBlock()}
      </div>

      {breadcrumbsBlock()}

      {headerBlock()} 
        
      <div className="user-block">
        {userBlock()}
      </div>
    </header>
  );
};

Header.defaultProps = {
  breadcrumbsMovieId: -1
}

Header.propTypes = {
  authorized: PropTypes.bool.isRequired,
  userInfo: Props.userInfo,
  currentPage: PropTypes.string.isRequired,
  breadcrumbsMovieId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => ({
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  userInfo: getUserInfo(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
