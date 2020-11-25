import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getAuthorizationStatus} from "../../store/selectors/user-selector";
import {connect} from "react-redux";
import {AuthorizationStatus, AppPages, AppRoute} from "../../const";
import {Link} from "react-router-dom";
import Breadcrumbs from "../breadcrumbs/breadcrumbs";
import UserBlock from "../user-block/user-block";

const Header = (props) => {
  const {authorized, currentPage} = props;

  const withActiveLink = (currentPage !== AppPages.MAIN);
  const withBreadcrumbs = (currentPage === AppPages.REVIEW);
  const withHeaderText = (currentPage === AppPages.AUTH) || (currentPage === AppPages.MYLIST);
  const withUserBlock = currentPage !== AppPages.AUTH;

  const logoClassName = withHeaderText ? `user-page__head` : `movie-card__head`;

  const logoLetter = (
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
          {logoLetter}
        </Link>
      );
    } else {
      return (
        <div className="logo__link">
          {logoLetter}
        </div>
      );
    }
  };

  const breadcrumbsBlock = () => {
    if (withBreadcrumbs) {
      return <Breadcrumbs />;
    } else {
      return null;
    }
  };

  const headerBlock = () => {
    if (withHeaderText) {
      return (
        <h1 className="page-title user-page__title">{(currentPage === AppPages.AUTH) ? `Sign in` : `My list`}</h1>
      );
    } else {
      return null;
    }
  };

  const userBlock = () => {
    if (withUserBlock) {
      if (authorized) {
        return <UserBlock currentPage={currentPage} />;
      } else {
        return (
          <Link to={AppRoute.LOGIN} className="user-block__link">
            Sign In
          </Link>
        );
      }
    } else {
      return null;
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

Header.propTypes = {
  authorized: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH
});

export {Header};
export default connect(mapStateToProps)(Header);
