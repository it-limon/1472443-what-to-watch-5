import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {AppPages, AppRoute} from "../../const";
import {Link} from "react-router-dom";

const Footer = (props) => {
  const {currentPage} = props;

  const withActiveLink = (currentPage !== AppPages.MAIN);

  const logoLetter = () => (
    <Fragment>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </Fragment>
  );

  return (
    <footer>
      {withActiveLink ?
        <Link className="logo__link logo__link--light" to={AppRoute.MAIN}>
          {logoLetter()}
        </Link> :
        <div className="logo__link logo__link--light">
          {logoLetter()}
        </div>
      }
      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  currentPage: PropTypes.string.isRequired
};

export default Footer;
