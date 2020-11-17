import React, {Fragment} from "react";
import Footer from "../footer/footer";
import Catalog from "../catalog/catalog";
import {AppPages} from "../../const";
import PromoMoviePage from "../promo-movie-page/promo-movie-page";

const MainPage = () => {
  return (
    <Fragment>
      
      <PromoMoviePage />

      <div className="page-content">
        <Catalog />

        <Footer currentPage={AppPages.MAIN} />
      </div>

    </Fragment>
  );
};

export default MainPage;
