import search from './search';
import album from './album';

import { API_URL, TOKEN } from './infra/environment';

export default class SpotifyWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || API_URL;
    this.token = options.token || TOKEN;

    this.search = search.bind(this)();
    this.album = album.bind(this)();
  }

  request(url) {
    const headers = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
    return fetch(url, headers);
  }
}
