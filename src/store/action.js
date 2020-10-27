export const ActionType = {
  CHANGE_MOVIE_GENRE: `CHANGE_MOVIE_GENRE`
};

export const ActionCreator = {
  changeMovieGenre: (genreKey) => ({
    type: ActionType.CHANGE_MOVIE_GENRE,
    payload: genreKey
  })
};
