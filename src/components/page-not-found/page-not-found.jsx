import React, {Fragment} from "react";
import {AppRoute} from "../../const";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const PageNotFound = (props) => {
  const {fromMainPage} = props;

  return (
    <Fragment>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      {!fromMainPage &&
        <Link to={AppRoute.MAIN}>
          Go to main page
        </Link>
      }
    </Fragment>
  );
};

PageNotFound.defaultProps = {
  fromMainPage: false
};

PageNotFound.propTypes = {
  fromMainPage: PropTypes.bool.isRequired
};

export default PageNotFound;
