import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

import { search, searchArtists, searchAlbums, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Search', () => {
  let fetchedStub;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
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

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
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
      search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        search('incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist');

        search('incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=album');
      });

      context('passing more than one type', () => {
        search('incubus', ['artist', 'album']);
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

  describe('search artists', () => {
    it('should call fetch function', () => {
      searchArtists('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      searchArtists('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist');
    });
  });

  describe('search albums', () => {
    it('should call fetch function', () => {
      searchAlbums('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      searchAlbums('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=album');
    });
  });

  describe('search tracks', () => {
    it('should call fetch function', () => {
      searchTracks('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      searchTracks('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=track');
    });
  });

  describe('search playlists', () => {
    it('should call fetch function', () => {
      searchPlaylists('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      searchPlaylists('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=playlist');
    });
  });
});
