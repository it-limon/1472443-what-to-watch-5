export const DataActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_COMMENTS: `LOAD_COMMENTS`
};

export const DataActionCreator = {
  loadMovies: (movies) => ({
    type: DataActionType.LOAD_MOVIES,
    payload: movies
  }),
  loadComments: (comments) => ({
    type: DataActionType.LOAD_COMMENTS,
    payload: comments
  })
};
