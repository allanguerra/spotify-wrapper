export const getAlbum = (idAlbum) =>
  fetch(`https://api.spotify.com/v1/albums/${idAlbum}`)
    .then((data) => data.json());

export const getAlbumTracks = () => {};
