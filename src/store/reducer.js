import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./Data/DataSlice";
import nowPlayingReducer from "./NowPlaying/NowPlayingSlice";
import popularReducer from "./Popular/PopularSlice";
import upcomingReducer from "./Upcoming/UpcomingSlice";
import creditReducer from "./Credit/CreditSlice";
import videoReducer from "./Video/VideoSlice";
import menuReducer from "./Menu/MenuSlice";
import loginReducer from "./Login/LoginSlice";
import favoriteReducer from "./Favorite/FavoriteSlice";
import watchListReducer from "./WatchList/WatchListSlice";
import ratingReducer from "./Rating/RatingSlice";
import castDetailReducer from "./Cast/CastDetailSlice";
import castMovieReducer from "./Cast/CastMovieSlice"
import similarMoviesReducer from "./SimilarMovies/SimilarMoviesSlice"
import collectionMoviesReducer from "./CollectionMovies/CollectionMoviesSlice"
import forYouReducer from "./ForYou/ForYouSlice"
import megaReducer from "./Mega/MegaSlice"

const reducer = combineReducers({
  data: dataReducer,
  nowPlaying: nowPlayingReducer,
  popular: popularReducer,
  upcoming: upcomingReducer,
  credit: creditReducer,
  video: videoReducer,
  menu: menuReducer,
  login: loginReducer,
  favorite: favoriteReducer,
  watchlist: watchListReducer,
  rating: ratingReducer,
  castDetail: castDetailReducer,
  castMovie: castMovieReducer,
  similarMovies: similarMoviesReducer,
  collectionMovies: collectionMoviesReducer,
  forYou: forYouReducer,
  mega: megaReducer,
});

export default reducer;
