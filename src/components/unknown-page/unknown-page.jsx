import React, {Fragment} from "react";
import {AppRoute} from "../../const";
import {Link} from "react-router-dom";

const UnknownPage = () => {
  return (
    <Fragment>
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>
      <Link to={AppRoute.MAIN}>
        Go to main page
      </Link>
    </Fragment>
  );
};

export default UnknownPage;
