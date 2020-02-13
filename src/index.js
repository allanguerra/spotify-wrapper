import {
  search,
  searchArtists,
  searchAlbums,
  searchTracks,
  searchPlaylists,
} from './search';

import {
  getAlbum,
  getAlbums,
  getAlbumTracks,
} from './album';

import { API_URL, TOKEN } from './infra/environment';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token || TOKEN;
  }
}
