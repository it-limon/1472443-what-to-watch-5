export const DataActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO_MOVIE: `LOAD_PROMO_MOVIE`,
  LOAD_COMMENTS: `LOAD_COMMENTS`
};

export const DataActionCreator = {
  loadMovies: (movies) => ({
    type: DataActionType.LOAD_MOVIES,
    payload: movies
  }),
  loadPromoMovie: (movie) => ({
    type: DataActionType.LOAD_PROMO_MOVIE,
    payload: movie
  }),
  loadComments: (comments) => ({
    type: DataActionType.LOAD_COMMENTS,
    payload: comments
  })
};
