export const ActionType = {
  CHANGE_MOVIE_GENRE: `CHANGE_MOVIE_GENRE`,
  INCREASE_SHOWN_MOVIES_COUNT: `INCREASE_SHOWN_MOVIES_COUNT`
};

export const ActionCreator = {
  changeMovieGenre: (genreKey) => ({
    type: ActionType.CHANGE_MOVIE_GENRE,
    payload: genreKey
  }),
  increaseShownMoviesCount: () => ({
    type: ActionType.INCREASE_SHOWN_MOVIES_COUNT
  })
};
