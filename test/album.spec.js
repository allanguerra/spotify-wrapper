import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chai, { expect } from 'chai';

import SpotifyWrapper from '../src/index';

chai.use(sinonChai);

global.fetch = require('node-fetch');

describe('Album Methods', () => {
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
    it('should have getAlbuns method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbuns method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(spotify.album.getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct url', () => {
      spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR');
      spotify.album.getAlbum('1rQZbncicoXyB64DqoH7OY');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/1rQZbncicoXyB64DqoH7OY');
    });

    it('should return the correct data from Promisse', () => {
      const albums = spotify.album.getAlbum('2i6nd4FV6y7K9fln6eelmR');

      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbums();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '1rQZbncicoXyB64DqoH7OY']);
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=2i6nd4FV6y7K9fln6eelmR,1rQZbncicoXyB64DqoH7OY');
      spotify.album.getAlbums(['1rQZbncicoXyB64DqoH7OY', '2i6nd4FV6y7K9fln6eelmR']);
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums?ids=1rQZbncicoXyB64DqoH7OY,2i6nd4FV6y7K9fln6eelmR');
    });

    it('should return correct data from Promisse', () => {
      const albums = spotify.album.getAlbums(['2i6nd4FV6y7K9fln6eelmR', '1rQZbncicoXyB64DqoH7OY']);

      albums.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });

  describe('getAlbumTracks', () => {
    it('should call fetch method', () => {
      spotify.album.getAlbumTracks();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with correct URL', () => {
      spotify.album.getAlbumTracks('1rQZbncicoXyB64DqoH7OY');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/1rQZbncicoXyB64DqoH7OY/tracks');
      spotify.album.getAlbumTracks('2i6nd4FV6y7K9fln6eelmR');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks');
    });

    it('should return correct data from Promisse', () => {
      const tracks = spotify.album.getAlbumTracks('1rQZbncicoXyB64DqoH7OY');

      tracks.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
