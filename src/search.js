import API_URL from './infra/environment';
import toJSON from './infra/utils';

export const search = (query, type) =>
  fetch(`${API_URL}/search?q=${query}&type=${type}`).then(toJSON);

export const searchArtists = (query) =>
  search(query, 'artist');

export const searchAlbums = (query) =>
  search(query, 'album');

export const searchTracks = (query) =>
  search(query, 'track');

export const searchPlaylists = (query) =>
  search(query, 'playlist');
