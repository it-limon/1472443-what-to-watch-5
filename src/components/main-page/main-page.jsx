import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import Footer from "../footer/footer";
import Catalog from "../catalog/catalog";
import {AppPages} from "../../const";
import PromoMoviePage from "../promo-movie-page/promo-movie-page";
import {connect} from "react-redux";
import {loadMainPage} from "../../store/api-actions";
import LoaderPage from "../loader-page/loader-page";

const MainPage = (props) => {
  const {onloadMainPage} = props;

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    onloadMainPage(setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          <PromoMoviePage />

          <div className="page-content">
            <Catalog />

            <Footer currentPage={AppPages.MAIN} />
          </div>

        </Fragment>
      }
    </Fragment>
  );
};

MainPage.propTypes = {
  onloadMainPage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onloadMainPage(setIsLoading) {
    dispatch(loadMainPage(setIsLoading));
  }
});

export {MainPage};
export default connect(null, mapDispatchToProps)(MainPage);
