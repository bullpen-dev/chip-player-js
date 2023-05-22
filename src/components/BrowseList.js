import React from 'react';
import bytes from 'bytes';
import { CATALOG_PREFIX } from '../config';
import DirectoryLink from './DirectoryLink';
import FavoriteButton from './FavoriteButton';

export default function BrowseList({ virtual, ...props }) {
  const {
    currContext,
    currIdx,
    favorites,
    toggleFavorite,
    handleSongClick,
    browsePath,
    playContext,
  } = props;

  // Scroll Into View
  // ----------------
  // Note this does not work for virtual list, since the playing item might not be in the DOM.
  // See also https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780

  return (
    <div style={{ position: 'relative' }}>
      <div style={virtual.style}>
        {virtual.items.map(item => {
          // XXX: Escape immediately: the escaped URL is considered canonical.
          //      The URL must be decoded for display from here on out.
          const path = item.path === '..' ?
            browsePath.substr(0, browsePath.lastIndexOf('/')) : // parent path
            item.path.replace('%', '%25').replace('#', '%23').replace(/^\//, '');
          const name = item.path.split('/').pop();
          const isPlaying = currContext === playContext && currIdx === item.idx;
          if (item.type === 'directory') {
            return (
              <div key={name} className="BrowseList-row">
                <div className="BrowseList-colName">
                  <DirectoryLink to={'/browse/' + path}>{name}</DirectoryLink>
                </div>
                <div className="BrowseList-colDir">
                  &lt;DIR&gt;
                </div>
                <div className="BrowseList-colCount" title={`Contains ${item.numChildren} direct child items`}>
                  {item.numChildren}
                </div>
                <div className="BrowseList-colSize" title={`Directory size is ${item.size} bytes (recursive)`}>
                  {item.size != null && bytes(item.size, { unitSeparator: ' ' })}
                </div>
              </div>
            );
          } else {
            const href = CATALOG_PREFIX + path;
            return (
              <div key={name} className={isPlaying ? 'Song-now-playing BrowseList-row' : 'BrowseList-row'}>
                <div className="BrowseList-colName">
                  {favorites &&
                    <FavoriteButton isFavorite={favorites.includes(href)}
                                    href={href}
                                    toggleFavorite={toggleFavorite}/>}
                  <a onClick={(e) => handleSongClick(href, playContext, item.idx)(e)}
                     href={href}>
                    {name}
                  </a>
                </div>
                <div className="BrowseList-colSize">
                  {bytes(item.size, { unitSeparator: ' ' })}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
