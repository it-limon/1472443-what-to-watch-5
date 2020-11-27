import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import Footer from "../footer/footer";
import Catalog from "../catalog/catalog";
import {AppPages} from "../../const";
import PromoMoviePage from "../promo-movie-page/promo-movie-page";
import {connect} from "react-redux";
import {loadMainPage} from "../../store/api-actions";
import {getIsPageNotFound} from "../../store/selectors/state-selector";
import PageNotFound from "../page-not-found/page-not-found";
import {getPromoMovie} from "../../store/selectors/data-selector";
import Props from "../../props";

const MainPage = (props) => {
  const {promoMovie, onLoadMainPage, isPageNotFound} = props;

  useEffect(() => {
    onLoadMainPage();
  }, []);

  if (!isPageNotFound && (promoMovie.id === -1)) {
    return null;
  }

  return (
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
  );
};

MainPage.propTypes = {
  promoMovie: Props.movie,
  onLoadMainPage: PropTypes.func.isRequired,
  isPageNotFound: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  promoMovie: getPromoMovie(state),
  isPageNotFound: getIsPageNotFound(state)
});

const mapDispatchToProps = (dispatch) => ({
  onLoadMainPage(setIsLoading) {
    dispatch(loadMainPage(setIsLoading));
  }
});

export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
