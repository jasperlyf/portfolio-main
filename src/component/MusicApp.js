import React from "react";

const MusicApp = () => {
  return (
    <div className="col-lg-12 col-md-12">
      <div className="center-music-player">
        <div className="SpotifyApp">
          <iframe
            src="https://open.spotify.com/embed/playlist/0lDPhr8Ki90SEiNp2oBssE?utm_source=generator"
            width="300"
            height="352"
            frameBorder=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;
