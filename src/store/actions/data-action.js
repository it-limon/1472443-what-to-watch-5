export const DataActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`
};

export const DataActionCreator = {
  loadMovies: (movies) => ({
    type: DataActionType.LOAD_MOVIES,
    payload: movies
  })
};
