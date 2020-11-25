import {DataActionType, DataActionCreator} from "../actions/data-action";
import {testMovie} from "../../test-dataset/test-movie";
import {testMovies} from "../../test-dataset/test-movies";
import {testComments} from "../../test-dataset/test-comments";

describe(`DataActionCreator work correctly`, () => {

  it(`Action creator for load movies returns correct action`, () => {
    expect(DataActionCreator.loadMovies(testMovies)).toEqual({
      type: DataActionType.LOAD_MOVIES,
      payload: testMovies
    });
  });

  it(`Action creator for load promo movie returns correct action`, () => {
    expect(DataActionCreator.loadPromoMovie(testMovie)).toEqual({
      type: DataActionType.LOAD_PROMO_MOVIE,
      payload: testMovie
    });
  });

  it(`Action creator for load favorite movies returns correct action`, () => {
    expect(DataActionCreator.loadFavoriteMovies(testMovies)).toEqual({
      type: DataActionType.LOAD_FAVORITE_MOVIES,
      payload: testMovies
    });
  });

  it(`Action creator for load comments returns correct action`, () => {
    expect(DataActionCreator.loadComments(testComments)).toEqual({
      type: DataActionType.LOAD_COMMENTS,
      payload: testComments
    });
  });

});
