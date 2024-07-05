import React, { memo, useCallback, useContext } from "react";
import FavoriteButton from "./FavoriteButton";
import { UserContext } from "./UserProvider";

export default memo(Favorites);
function Favorites(props) {
  const {
    currContext,
    currIdx,
    onSongClick,
    handleShufflePlay,
  } = props;

  const {
    user,
    loadingUser,
    faves: favorites,
    handleLogin,
  } = useContext(UserContext);

  const favesContext = favorites.map(fave => fave.href);

  const handleShufflePlayFavorites = useCallback(() => {
    handleShufflePlay('favorites');
  }, [handleShufflePlay]);

  // Scroll Into View
  // ----------------
  // const playingRowRef = useRef(null);
  //
  // useEffect(() => {
  //   if (playingRowRef.current) {
  //     playingRowRef.current.scrollIntoViewIfNeeded();
  //   }
  // });
  console.log('Favorites');

  return (
    loadingUser ?
      <p>Loading user data...</p>
      :
      <div>
        <h3 className="Browse-topRow">
          Favorite Songs ({favorites.length})
          {favorites.length > 1 &&
            <button
              className="box-button"
              title={`Shuffle all ${favorites.length} favorites`}
              onClick={handleShufflePlayFavorites}>
              Shuffle Play
            </button>}
        </h3>
        {user ?
          favorites.length > 0 ?
            <div>
              {
                favorites.map((favorite, i) => {
                  const { href, mtime } = favorite;
                  const date = new Date(mtime * 1000).toISOString().split('T')[0];
                  const name = decodeURIComponent(href.split('/').pop());
                  const isPlaying = currContext === favesContext && currIdx === i;
                  return (
                    <div className={isPlaying ? 'Song-now-playing BrowseList-row' : 'BrowseList-row'}
                      // Scroll Into View
                      // ref={isPlaying ? playingRowRef : null}
                         key={i}>
                      <div className="BrowseList-colName">
                        <FavoriteButton href={href}/>
                        <a onClick={onSongClick(href, favesContext, i)} href={href}>{name}</a>
                      </div>
                      <div className="BrowseList-colMtime">
                        {date}
                      </div>
                    </div>
                  );
                })
              }
            </div>
            :
            <div>
              You don't have any favorites yet.<br/>
              Click the &#003; heart icon next to any song to save a favorite.
            </div>
          :
          <span>
              You must <a href="#" onClick={handleLogin}>
              login or signup</a> to save favorites.
            </span>
        }
      </div>
  );
}
