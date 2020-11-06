import React, {Fragment} from "react";
import Catalog from "../catalog/catalog";
import {getAuthorizationStatus, getUserInfo} from "../../store/selectors/user-selector";
import {connect} from "react-redux";
import {AuthorizationStatus} from "../../const";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Props from "../../props";

const MainPage = (props) => {
  const {authorized, userInfo} = props;

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            {authorized
              ?
              <Link to="/mylist">
                <div className="user-block__avatar">
                  <img src={userInfo.avatarUrl} alt={userInfo.name} width="63" height="63" />
                </div>
              </Link>
              :
              <Link to="/login" className="user-block__link">
                Sign In
              </Link>
            }
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">name</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">genre</span>
                <span className="movie-card__year">released</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog />

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

MainPage.propTypes = {
  authorized: PropTypes.bool.isRequired,
  userInfo: Props.userInfo
};

const mapStateToProps = (state) => ({
  authorized: getAuthorizationStatus(state) === AuthorizationStatus.AUTH,
  userInfo: getUserInfo(state)
});

export {MainPage};
export default connect(mapStateToProps)(MainPage);
