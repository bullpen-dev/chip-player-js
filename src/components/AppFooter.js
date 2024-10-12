import React, { memo, useCallback, useContext } from 'react';
import diceImage from '../images/dice.png';
import downloadImage from '../images/download.png';
import copyImage from '../images/copy.png';
import repeatImage from '../images/repeat.png';
import TimeSlider from './TimeSlider';
import VolumeSlider from './VolumeSlider';
import FavoriteButton from './FavoriteButton';
import PlayerParams from './PlayerParams';
import { pathToLinks } from '../util';
import { REPEAT_LABELS, SHUFFLE_LABELS } from '../Sequencer';
import { UserContext } from './UserProvider';

export default memo(AppFooter);
function AppFooter(props) {
  const {
    // this.state.
    currentSongDurationMs,
    currentSongNumSubtunes,
    currentSongNumVoices,
    currentSongSubtune,
    ejected,
    imageUrl,
    infoTexts,
    paused,
    repeat,
    shuffle,
    songUrl,
    subtitle,
    tempo,
    title,
    voiceNames,
    voiceMask,
    volume,

    // this.
    getCurrentSongLink,
    handleCopyLink,
    handleCycleRepeat,
    handleCycleShuffle,
    handleSetVoiceMask,
    handleTempoChange,
    handleTimeSliderChange,
    handleVolumeChange,
    nextSong,
    nextSubtune,
    prevSong,
    prevSubtune,
    sequencer,
    toggleInfo,
    togglePause,
  } = props;

  const {
    faves,
    showPlayerSettings,
    handleToggleFavorite,
    toggleSettings,
  } = useContext(UserContext);

  const pathLinks = pathToLinks(songUrl);
  const subtuneText = `Tune ${currentSongSubtune + 1} of ${currentSongNumSubtunes}`;

  const handleToggleInfo = useCallback((e) => {
    e.preventDefault();
    toggleInfo();
  }, [toggleInfo]);

  const handleCopySongLink = useCallback((e) => {
    e.preventDefault();
    handleCopyLink(getCurrentSongLink());
  }, [getCurrentSongLink, handleCopyLink]);

  const handleCopySubtuneLink = useCallback((e) => {
    e.preventDefault();
    handleCopyLink(getCurrentSongLink(/*withSubtune=*/true));
  }, [getCurrentSongLink, handleCopyLink]);

  return (
    <div className="AppFooter">
      <div className="AppFooter-main">
        <div className="AppFooter-main-inner">
          <div className="SongDetails-title">
            <marquee scrollamount="2">
            { songUrl ?
              <>
                <a style={{ color: 'var(--neutral4)' }} href={getCurrentSongLink()}
                   title="Copy song link to clipboard"
                   onClick={handleCopySongLink}
                >
                  {title}{' '}
                  <img alt="Copy link" src={copyImage} className="inline-icon"/>
                </a>
              </>
              :
              title === 'undefined' ? 'Press play for some nice music :)' : title
            }
            </marquee>
          </div>
          <div id="buttonsAndTimeline">
          <TimeSlider
            paused={paused}
            currentSongDurationMs={currentSongDurationMs}
            getCurrentPositionMs={() => {
              // TODO: reevaluate this approach
              if (sequencer && sequencer.getPlayer()) {
                return sequencer.getPlayer().getPositionMs();
              }
              return 0;
            }}
            onChange={handleTimeSliderChange}/>
          <button onClick={prevSong}
                  title="Previous"
                  className="box-button"
                  disabled={ejected}>
            ⏮
          </button>
          {' '}
          <button onClick={togglePause}
                  title={paused ? 'Resume' : 'Pause'}
                  className="box-button"
                  disabled={ejected}>
            {paused ? ' ► ' : ' ⏸ '}
          </button>
          {' '}
          <button onClick={nextSong}
                  title="Next"
                  className="box-button"
                  disabled={ejected}>
            ⏭
          </button>
          </div>
        </div>
      </div>
      {(showPlayerSettings && false) && // TODO: Remove footer settings
        <div className="AppFooter-settings">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
            marginBottom: '19px'
          }}>
            <h3 style={{ margin: '0 8px 0 0' }}>Player Settings</h3>
            <button className='box-button' onClick={toggleSettings}>
              Close
            </button>
          </div>
          {sequencer.getPlayer() ?
            <PlayerParams
              ejected={ejected}
              tempo={tempo}
              numVoices={currentSongNumVoices}
              voiceMask={voiceMask}
              voiceNames={voiceNames}
              handleTempoChange={handleTempoChange}
              handleSetVoiceMask={handleSetVoiceMask}
              getParameter={sequencer.getPlayer().getParameter}
              setParameter={sequencer.getPlayer().setParameter}
              paramDefs={sequencer.getPlayer().getParamDefs()}/>
            :
            <div>(No active player)</div>}
        </div>}
      {imageUrl &&
        <img alt="Cover art" className="AppFooter-art" src={imageUrl}/>}
    </div>
  );
}
