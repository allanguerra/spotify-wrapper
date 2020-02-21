import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Search', () => {
  let spotify;
  let fetchedStub;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'token',
    });
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('search artists', () => {
    it('should call fetch function', () => {
      spotify.search.artists('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      spotify.search.artists('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=artist');
    });
  });

  describe('search albums', () => {
    it('should call fetch function', () => {
      spotify.search.albums('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      spotify.search.albums('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=album');
    });
  });

  describe('search tracks', () => {
    it('should call fetch function', () => {
      spotify.search.tracks('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      spotify.search.tracks('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=track');
    });
  });

  describe('search playlists', () => {
    it('should call fetch function', () => {
      spotify.search.playlists('incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should be called with the correct URL', () => {
      spotify.search.playlists('incubus');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=incubus&type=playlist');
    });
  });
});
