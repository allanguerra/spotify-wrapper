import API_URL from './infra/environment';
import toJSON from './infra/utils';

export const getAlbum = (idAlbum) =>
  fetch(`${API_URL}/albums/${idAlbum}`).then(toJSON);

export const getAlbums = (idAlbums) =>
  fetch(`${API_URL}/albums?ids=${idAlbums}`).then(toJSON);

export const getAlbumTracks = (idAlbum) =>
  fetch(`${API_URL}/albums/${idAlbum}/tracks`).then(toJSON);
