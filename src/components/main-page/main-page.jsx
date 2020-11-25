import React, {Fragment, useState, useEffect} from "react";
import PropTypes from "prop-types";
import Footer from "../footer/footer";
import Catalog from "../catalog/catalog";
import {AppPages} from "../../const";
import PromoMoviePage from "../promo-movie-page/promo-movie-page";
import {connect} from "react-redux";
import {loadMainPage} from "../../store/api-actions";
import LoaderPage from "../loader-page/loader-page";
import {getIsPageNotFound} from "../../store/selectors/state-selector";
import PageNotFound from "../page-not-found/page-not-found";

const MainPage = (props) => {
  const {withLoader, onLoadMainPage, isPageNotFound} = props;

  const [isLoading, setIsLoading] = useState(withLoader);
  useEffect(() => {
    onLoadMainPage(setIsLoading);
  }, []);

  return (
    <Fragment>
      {isLoading ?
        <LoaderPage /> :
        <Fragment>
          {isPageNotFound ?
            <PageNotFound fromMainPage={true}/> :
            <Fragment>
              <PromoMoviePage />

              <div className="page-content">
                <Catalog />

                <Footer currentPage={AppPages.MAIN} />
              </div>

            </Fragment>
          }
        </Fragment>
      }
    </Fragment>
  );
};

MainPage.defaultProps = {
  withLoader: true
};

MainPage.propTypes = {
  withLoader: PropTypes.bool.isRequired,
  onLoadMainPage: PropTypes.func.isRequired,
  isPageNotFound: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isPageNotFound: getIsPageNotFound(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMainPage(setIsLoading) {
    dispatch(loadMainPage(setIsLoading));
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
