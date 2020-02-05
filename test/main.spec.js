import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import chai, { expect } from 'chai';
import { search, searchArtists, searchAlbuns, searchTracks, searchPlaylists } from '../src/main';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchAlbuns method', () => {
      expect(searchAlbuns).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('generic search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {

        const artists = search('incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist');

        const albuns = search('incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=album');
      });

      context('passing more than one type', () => {

        const artists = search('incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist,album');
      });
    });

    it('should return the JSON Data from the promise', () => {
      const artist = search('incubus', 'artist');

      artist.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
